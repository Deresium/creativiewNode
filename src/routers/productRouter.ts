import express from "express";
import multer from "multer";
import {auth, authOnlyOwner} from "../middlewares/authentication";
import {sequelize} from "../pgConnexion";
import {Transaction} from "sequelize";
import Product from "../db/models/eshop/Product";
import Picture from "../db/models/eshop/Picture";
import Price from "../db/models/eshop/Price";

const productRouter = express.Router();

const upload = multer();

productRouter.post('/product', auth, authOnlyOwner, upload.array('picture'), async(req, res) => {
	try{
		await sequelize.transaction(async(t: Transaction) => {
			const name = req.body.name;
			const description = req.body.description;
			const code = req.body.code;
			const reference = req.body.reference;
			const prices = JSON.parse(req.body.prices);
			const files: any = req.files;
			const createdProduct = await Product.create({
				name,
				description,
				code,
				reference
			}, {transaction: t});
			
			for(const file of files){
				await Picture.create({
					name: file.originalname,
					format: file.mimetype,
					picture: file.buffer,
					productId: createdProduct.productId
				},{transaction: t})
			}
			for(const price of prices){
				await Price.create({
					productId: createdProduct.productId,
					categoryId: price.categoryId,
					price: price.price,
					startDate: Date.now()
				}, {transaction: t})
			}
			
			res.status(200).send();
		});
	}catch(error){
		console.log(error);
		res.status(500).send();
	}
})

productRouter.put('/product/:id', auth, authOnlyOwner, upload.array('picture'), async(req, res) => {
	try{
		const product = await Product.findByPk(req.params.id, {include: [{association: Product.associations.pictures, attributes: ['id', 'name', 'format']},{association: Product.associations.prices, include: [{association: Price.associations.category}]}]});
		if(product){
			await sequelize.transaction(async(t: Transaction) => {
				const name = req.body.name;
				const description = req.body.description;
				const code = req.body.code;
				const reference = req.body.reference;
				const prices = JSON.parse(req.body.prices);
				const files: any = req.files;
				const existingFiles = req.body.existingPicture;

				const typedExistingFiles: number[] = new Array<number>();
				if(existingFiles) {
					if (typeof existingFiles === "string") {
						typedExistingFiles.push(parseInt(existingFiles));
					} else {
						for (const existingFile of existingFiles) {
							typedExistingFiles.push(parseInt(existingFile));
						}
					}
				}
				
				await product.updateProduct({
					name,
					description,
					code,
					reference
				}, t);
				
				await product.updatePrices(prices, t);
				
				for(const dbFile of product.listPictures){
					let find = false;
					for(const typedExistingFile of typedExistingFiles){
						if(dbFile.pictureId === typedExistingFile)
							find = true;
					}
					if(!find)
						await dbFile.destroy({transaction: t});
				}
				
				for(const file of files){
					await Picture.create({
						name: file.originalname,
						format: file.mimetype,
						picture: file.buffer,
						productId: req.params.id
					},{transaction: t})
				}
				
				res.status(200).send();
			});
		}else
			res.status(500).send();
	}catch(error){
		console.log(error);
		res.status(500).send();
	}
})

productRouter.get('/product', async(req, res) => {
	try{
		const products = await Product.findAll({where:{delete: false}, include: [{association: Product.associations.prices, where:{endDate: null}, include: [{association: Price.associations.category}]}]});
		res.send(products);
	}catch(error) {
		console.log(error);
		res.status(500).send();
	}
})

productRouter.get('/product/:id', async(req, res) => {
	try{
		const product = await Product.findByPk(req.params.id, {include: [{association: Product.associations.pictures, attributes: ['id', 'name', 'format']},{association: Product.associations.prices, where:{endDate: null}, include: [{association: Price.associations.category}]}]})
		if(product)
			res.send(product);
		else
			res.status(404).send();
	}catch(error){
		console.log(error);
		res.status(500).send();
	}
})

productRouter.get('/product/picture/:id', async(req, res) => {
	try{
		const picture = await Picture.findByPk(req.params.id);
		if(picture){
			res.set('Content-Type', 'image/jpg');
			res.send(picture.pictureData);
		}else{
			res.status(404).send();
		}
	}catch(error){
		console.log(error);
		res.status(500).send();
	}
})

productRouter.delete('/product/:id', auth, authOnlyOwner, async(req, res) => {
	try{
		const product = await Product.findByPk(req.params.id);
		if(product){
			product.deleteProduct();
			await product.save();
		}
		else
			res.status(404);
		res.send();
	}catch(error){
		console.log(error);
		res.status(500).send('Une erreur est survenue');
	}
})

export default productRouter;