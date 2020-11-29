import Price from "../models/eshop/Price";

const getPriceOnCategoryIdAndProductId = async(categoryId: number, productId: number) => {
	const price = await Price.findOne({where:{categoryId, productId}});
	if(price)
		return price;
	return undefined;
}

export{
	getPriceOnCategoryIdAndProductId
}
