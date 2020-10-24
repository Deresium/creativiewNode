import {Model, DataTypes, Association} from "sequelize";
import {sequelize} from "../../../pgConnexion";

export default class Category extends Model{
	private id: number;
	private name: string;
	private abbreviation: string;
}

Category.init({
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
		type: new DataTypes.STRING(64),
		allowNull: false
	}
},{
	tableName: 'Categories',
	sequelize
});