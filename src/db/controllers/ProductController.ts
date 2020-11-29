import Product from "../models/eshop/Product";
import Price from "../models/eshop/Price";

const getProduct = async (productId: number) => {
	return await Product.findByPk(productId,
		{
			include:
				[
					{association: Product.associations.pictures, attributes: ['id', 'name', 'format']},
					{
						association: Product.associations.prices,
						where: {endDate: null},
						include: [{association: Price.associations.category}]
					}
				]
		});
}

export{
	getProduct
}
