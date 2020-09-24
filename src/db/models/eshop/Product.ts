import {Model, DataTypes} from "sequelize";
import {sequelize} from "../../../pgConnexion";

export default class Product extends Model{
	private id!: number;
	private code: string;
	private reference: string;
	private name!: string;
	private description: string;
	private picture!: Buffer;
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
	picture: {
		type: DataTypes.BLOB,
		allowNull: true
	}
},{
	tableName: 'Products',
	sequelize
});