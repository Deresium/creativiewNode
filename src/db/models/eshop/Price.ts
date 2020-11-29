import {Model, DataTypes, Association, Transaction} from "sequelize";
import {sequelize} from "../../../pgConnexion";
import Category from "./Category";
import Picture from "./Picture";
import Gallery from "../Gallery";
import Photo from "../Photo";

export default class Price extends Model{
	private id: number;
	private productId: number;
	private categoryId: number;
	private price: number;
	private startDate: Date;
	private endDate: Date;
	private category: Category;
	public static associations:{
		category: Association<Price, Category>;
	}
	
	async endPrice(t: Transaction){
		this.endDate = new Date();
		await this.save({transaction: t});
	}
	
	get pricePrice(){
		return this.price;
	}
	
	get priceId(){
		return this.id;
	}
}

Price.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	productId: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	categoryId: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	price: {
		type: DataTypes.FLOAT,
		allowNull: false
	},
	startDate: {
		type: DataTypes.DATE,
		allowNull: false
	},
	endDate: {
		type: DataTypes.DATE,
		allowNull: true
	}
},{
	tableName: 'Prices',
	sequelize
});
Price.belongsTo(Category,{foreignKey: "categoryId", targetKey: "id", as:"category"});