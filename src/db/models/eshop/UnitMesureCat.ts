import {Model, DataTypes} from "sequelize";
import {sequelize} from "../../../pgConnexion";

export default class UnitMesureCat extends Model{
	private id!: number;
	private name!: string;
}

UnitMesureCat.init({
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
	tableName: 'Unitmesurecats',
	sequelize
});