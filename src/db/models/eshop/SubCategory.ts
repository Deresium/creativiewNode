import {Model, DataTypes} from "sequelize";
import {sequelize} from "../../../pgConnexion";

export default class SubCategory extends Model{
	private id!: number;
	private name!: string;
	private abbreviation!: string;
	private categoryId!: number;
}

SubCategory.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	name: {
		type: new DataTypes.STRING(256),
		allowNull: false
	},
	abbreviation: {
		type: new DataTypes.STRING(16),
		allowNull: false
	},
	categoryId: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
},{
	tableName: 'Subcategories',
	sequelize
});