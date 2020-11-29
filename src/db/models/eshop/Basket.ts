import {Model, DataTypes, Association} from "sequelize";
import {sequelize} from "../../../pgConnexion";
import ProductBasket from "./ProductBasket";

export default class Basket extends Model{
	private id: number;
	private userId: number;
	private state: string;
	private externalRef: string;
	private productsBasket: Array<ProductBasket>;
	private bill: Blob;
	
	
	public static associations:{
		productsBasket: Association<Basket, ProductBasket>;
	}
	
	get basketId(){
		return this.id;
	}
	
	get basketProductsBasket(){
		return this.productsBasket;
	}
	
	get basketBilling(){
		return this.bill;
	}
	
	set basketBilling(bill){
		this.bill = bill;
	}
}

Basket.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: true
	},
	state: {
		type: new DataTypes.STRING(256),
		allowNull: false
	},
	externalRef: {
		type: new DataTypes.STRING(256),
		allowNull: true
	},
	bill: {
		type: DataTypes.BLOB,
		allowNull: true
	}
},{
	tableName: 'Baskets',
	sequelize
});
Basket.hasMany(ProductBasket, {sourceKey: "id", foreignKey: "basketId", as:"productsBasket"});