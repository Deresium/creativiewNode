import {Model, DataTypes} from "sequelize";
import {sequelize} from "../../../pgConnexion";

export default class ProductBasket extends Model{
	private id: number;
	private basketId: number;
	private categoryId: number;
	private productId: number;
	private priceId: number;
	private quantity: number;
	
	get productBasketId(){
		return this.id;
	}
	
	get productBasketQuantity(){
		return this.quantity;
	}
	
	set productBasketQuantity(quantity){
		this.quantity = quantity;
	}
	
	get pbCategoryId(){
		return this.categoryId;
	}
	
	get pbProductId(){
		return this.productId;
	}
	
	set pbPriceId(priceId: number){
		this.priceId = priceId;
	}
}

ProductBasket.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	basketId: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	categoryId: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	productId: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	priceId: {
		type: DataTypes.INTEGER,
		allowNull: true
	},
	quantity: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
},{
	tableName: 'ProductsBasket',
	sequelize
})

