import {Model, DataTypes} from "sequelize";
import {sequelize} from "../../../pgConnexion";

export default class UnitMesure extends Model{
	private id!: number;
	private name!: string;
	private abbreviation!: string;
	private unitMesureCat!: number;
}

UnitMesure.init({
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
	unitMesureCat: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
},{
	tableName: 'Unitmesures',
	sequelize
});