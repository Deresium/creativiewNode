import {Model, DataTypes} from "sequelize";
import {sequelize} from "../../../pgConnexion";

export default class Price extends Model{
	private id!: number;
	private productId!: number;
	private price!: number;
	private startDate: Date;
	private endDate: Date;
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
		allowNull: false
	}
},{
	tableName: 'Prices',
	sequelize
});