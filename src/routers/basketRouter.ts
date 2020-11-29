import express from "express";
import Basket from "../db/models/eshop/Basket";
import cookie from "cookie";
import {retrieveUser} from "../middlewares/authentication";
import {getExternalRefBasketCookie} from "../cookies";
import {v4 as uuidv4} from 'uuid';
import ProductBasket from "../db/models/eshop/ProductBasket";
import {sequelize} from "../pgConnexion";
import {Transaction} from "sequelize";
import generateBilling from "../generateBilling";
import {findCurrentBasket, getSeparateTotalBasket, getTotalBasket} from "../db/controllers/BasketController";
import {getPriceOnCategoryIdAndProductId} from "../db/controllers/PriceController";
import fs from "fs";
import {getFromAWS} from "../awsCalls";

const basketRouter = express.Router();

basketRouter.post('/addToBasket', retrieveUser, async(req, res) => {
	await sequelize.transaction(async(t: Transaction) => {
		const userId = req.userId;
		let basket;
		if (userId) {
			basket = await Basket.findOne({where: {userId, state: 'BASKET'}, include: [{association: Basket.associations.productsBasket}]});
			if (!basket) {
				basket = await Basket.create({
					userId: userId,
					state: 'BASKET'
				}, {transaction: t});
			}
		} else {
			const cookies = cookie.parse(req.headers.cookie || '');
			const externalRef = cookies.externalRefBasket;
			if (externalRef)
				basket = await Basket.findOne({where: {externalRef, state: 'BASKET'}, include: [{association: Basket.associations.productsBasket}]});
			else {
				const uuid = uuidv4();
				basket = await Basket.create({
					externalRef: uuid,
					state: 'BASKET'
				},{transaction: t})
				res.setHeader('Set-Cookie', getExternalRefBasketCookie(uuid));
			}
		}
		
		if (!basket) {
			res.status(500).send();
			return
		}
		
		const productId = req.body.productId;
		const categoryId = req.body.categoryId;
		const quantity = req.body.quantity;
		
		if (!productId || !categoryId) {
			res.status(404).send();
			return;
		}
		
		let foundProduct = false;
		if(basket.basketProductsBasket) {
			for (let i = 0; i < basket.basketProductsBasket.length && !foundProduct; ++i) {
				const basketProduct = basket.basketProductsBasket[i];
				if (basketProduct.pbCategoryId === categoryId && basketProduct.pbProductId === productId) {
					basketProduct.productBasketQuantity = basketProduct.productBasketQuantity + quantity;
					await basketProduct.save({transaction: t});
					foundProduct = true;
				}
			}
		}
		
		if (!foundProduct) {
			await ProductBasket.create({
				basketId: basket.basketId,
				categoryId,
				productId,
				quantity
			}, {transaction: t})
		}
		res.send();
	});
});

basketRouter.get('/basket', retrieveUser, async(req, res) => {
	const userId = req.userId;
	const cookies = cookie.parse(req.headers.cookie || '');
	const externalRef = cookies.externalRefBasket;
	const basket = await findCurrentBasket(userId, externalRef);
	
	if(!basket){
		res.status(404).send();
	}
	else {
		res.send(basket);
	}
})

basketRouter.put('/productBasket', retrieveUser, async(req, res) => {
	const userId = req.userId;
	const cookies = cookie.parse(req.headers.cookie || '');
	const externalRef = cookies.externalRefBasket;
	const basket = await findCurrentBasket(userId, externalRef);
	
	if(!basket){
		res.status(404).send();
		return;
	}
	
	if(!req.body.productBasketId || !req.body.quantity){
		res.status(400).send();
		return;
	}
	
	let updated = false;
	for(let i = 0; i < basket.basketProductsBasket.length && !updated; ++i){
		const productBasket = basket.basketProductsBasket[i];
		if(productBasket.productBasketId === req.body.productBasketId){
			productBasket.productBasketQuantity = req.body.quantity;
			await productBasket.save();
			updated = true;
		}
	}
	
	if(updated)
		res.send();
	else
		res.status(400).send();
})

basketRouter.delete('/productBasket/:id', retrieveUser, async(req, res) => {
	const userId = req.userId;
	const cookies = cookie.parse(req.headers.cookie || '');
	const externalRef = cookies.externalRefBasket;
	const basket = await findCurrentBasket(userId, externalRef);
	
	if(!basket){
		res.status(404).send();
		return;
	}
	
	if(!req.params.id){
		res.status(400).send();
		return;
	}
	
	const id = parseInt(req.params.id);
	
	let deleted = false;
	for(let i = 0; i < basket.basketProductsBasket.length && !deleted; ++i){
		const productBasket = basket.basketProductsBasket[i];
		if(productBasket.productBasketId === id){
			await productBasket.destroy();
			deleted = true;
		}
	}
	
	if(deleted)
		res.send();
	else {
		res.status(400).send();
	}
})

basketRouter.post('/order', retrieveUser, async(req, res) => {
	await sequelize.transaction(async(t: Transaction) => {
		const userId = req.userId;
		const cookies = cookie.parse(req.headers.cookie || '');
		const externalRef = cookies.externalRefBasket;
		const basket = await findCurrentBasket(userId, externalRef);
		
		if (!basket) {
			res.status(404).send();
			return;
		}
		
		const mapBasketProductFromReq = new Map<number, any>();
		for (const basketProduct of req.body) {
			mapBasketProductFromReq.set(basketProduct.id, basketProduct);
		}
		for (let i = 0; i < basket.basketProductsBasket.length; ++i) {
			const productBasketFromDb = basket.basketProductsBasket[i];
			if (mapBasketProductFromReq.has(productBasketFromDb.productBasketId)) {
				productBasketFromDb.productBasketQuantity = mapBasketProductFromReq.get(productBasketFromDb.productBasketId).quantity;
				const price = await getPriceOnCategoryIdAndProductId(productBasketFromDb.pbCategoryId, productBasketFromDb.pbProductId);
				productBasketFromDb.pbPriceId = price.priceId;
				await productBasketFromDb.save({transaction: t});
			}else{
				await productBasketFromDb.destroy({transaction: t});
			}
		}
		await generateBilling(basket, await getSeparateTotalBasket(userId, externalRef));
		res.send(basket.basketId.toString());
	})
})

basketRouter.get('/basketBilling/:idBasket', async(req, res) => {
	const basket = await Basket.findByPk(req.params.idBasket);
	if(!req.params.idBasket) {
		res.status(400).send();
		return;
	}
	
	const file = await getFromAWS(parseInt(req.params.idBasket));
	
	if(!file){
		res.status(404).send();
		return;
	}
	console.log('FILE', file);
	res.setHeader('Content-Type', 'application/pdf');
	res.send(file);
})

basketRouter.get('/totalBasket', retrieveUser, async(req, res) => {
	const userId = req.userId;
	const cookies = cookie.parse(req.headers.cookie || '');
	const externalRef = cookies.externalRefBasket;
	const total = await getTotalBasket(userId, externalRef);
	res.send(total.toString());
})

export default basketRouter;