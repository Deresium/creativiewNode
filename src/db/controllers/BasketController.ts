import Basket from "../models/eshop/Basket";
import {getPriceOnCategoryIdAndProductId} from "./PriceController";
import Product from "../models/eshop/Product";

const findCurrentBasket = async(userId: number, externalRef: string) => {
	let basket;
	if (userId) {
		basket = await Basket.findOne({
			where: {userId, state: 'BASKET'},
			include: [{association: Basket.associations.productsBasket}]
		});
	} else {
		if (externalRef) {
			basket = await Basket.findOne({
				where: {externalRef, state: 'BASKET'},
				include: [{association: Basket.associations.productsBasket}]
			});
		}
	}
	return basket;
}

const getTotalBasket = async (userId: number, externalRef: string) => {
	const basket = await findCurrentBasket(userId, externalRef);
	if(!basket)
		return '0';
	
	let total = 0;
	for(const productBasket of basket.basketProductsBasket){
		const product = await Product.findByPk(productBasket.pbProductId);
		const price = await getPriceOnCategoryIdAndProductId(productBasket.pbCategoryId, productBasket.pbProductId);
		total += (productBasket.productBasketQuantity*(price.pricePrice * (1 + product.productVat/100)));
	}
	return total.toFixed(2);
}

const getSeparateTotalBasket = async(userId: number, externalRef: string) => {
	let totals: Map<number, [number, number]> = new Map<number, [number, number]>();
	
	const basket = await findCurrentBasket(userId, externalRef);
	if(!basket) {
		return {
			total: 0,
			totals
		};
	}
	
	
	let total = 0;
	for(const productBasket of basket.basketProductsBasket){
		const product = await Product.findByPk(productBasket.pbProductId);
		const price = await getPriceOnCategoryIdAndProductId(productBasket.pbCategoryId, productBasket.pbProductId);
		
		const existingVat = totals.get(product.productVat);
		const priceHTVA = productBasket.productBasketQuantity*price.pricePrice;
		const priceTVAC = productBasket.productBasketQuantity*(price.pricePrice * (1 + product.productVat/100));
		total += (productBasket.productBasketQuantity*(price.pricePrice * (1 + product.productVat/100)));
		if(existingVat){
			existingVat[0] += priceHTVA;
			existingVat[1] += priceTVAC;
		}else{
			totals.set(product.productVat, [priceHTVA, priceTVAC]);
		}
	}
	
	return{
		total,
		totals
	}
}

export{
	findCurrentBasket,
	getTotalBasket,
	getSeparateTotalBasket
}