import {Model, DataTypes} from "sequelize";
import {sequelize} from "../../../pgConnexion";

export default class ProductIngredient extends Model{
	private id!: number;
	private productId!: number;
	private ingredientId!: number;
	private categoryId!: number;
	private quantity: number;
	private startDate!: Date;
	private endDate!: Date;
}

ProductIngredient.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	productId: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	ingredientId: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	categoryId: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	quantity: {
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
	tableName: 'ProductIngredients',
	sequelize
});