import {Model, DataTypes, Association, Transaction} from "sequelize";
import {sequelize} from "../../../pgConnexion";
import Picture from "./Picture";
import Price from "./Price";

export default class Product extends Model{
	private id!: number;
	private code: string;
	private reference: string;
	private name!: string;
	private description: string;
	private pictures: Picture[];
	private prices: Price[];
	private deleteDate: Date;
	private delete: boolean;
	public static associations:{
		pictures: Association<Product, Picture>;
		prices: Association<Product, Price>;
	}
	
	get productId(){
		return this.id;
	}
	
	deleteProduct(){
		this.deleteDate = new Date();
		this.delete = true;
	}
	
	async updateProduct(product: any, t: Transaction){
		this.name = product.name;
		this.code = product.code;
		this.reference = product.reference;
		this.description = product.description;
		await this.save({transaction: t})
	}
	
	async updatePrices(prices: any[], t: Transaction){
		for(const price of this.prices){
			await price.endPrice(t);
		}
		for(const price of prices){
			await Price.create({
				productId: this.id,
				categoryId: price.categoryId,
				price: price.price,
				startDate: Date.now()
			}, {transaction: t})
		}
	}
	
	get listPictures(){
		return this.pictures;
	}
}

Product.init({
	id: {
		type: DataTypes.NUMBER,
		autoIncrement: true,
		primaryKey: true
	},
	code: {
		type: new DataTypes.STRING(256),
		allowNull: true
	},
	reference: {
		type: new DataTypes.STRING(512),
		allowNull: true
	},
	name: {
		type: new DataTypes.STRING(256),
		allowNull: false
	},
	description: {
		type: new DataTypes.STRING(4000),
		allowNull: true
	},
	delete: {
		type: DataTypes.BOOLEAN,
		allowNull: true,
		defaultValue: false
	},
	deleteDate: {
		type: DataTypes.DATE,
		allowNull: true,
	}
},{
	tableName: 'Products',
	sequelize
});
Product.hasMany(Picture, {sourceKey: "id", foreignKey: "productId", as:"pictures"});
Product.hasMany(Price, {sourceKey: "id", foreignKey: "productId", as:"prices"});