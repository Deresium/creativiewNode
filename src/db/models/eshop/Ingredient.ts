import {Model, DataTypes} from "sequelize";
import {sequelize} from "../../../pgConnexion";

export default class Ingredient extends Model{
	private id!: number;
	private name!: string;
	
}

Ingredient.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	name: {
		type: new DataTypes.STRING(256),
		allowNull: false
	}
},{
	tableName: 'Ingredients',
	sequelize
})