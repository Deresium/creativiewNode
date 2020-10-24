import {Model, DataTypes} from "sequelize";
import {sequelize} from "../../../pgConnexion";

export default class Picture extends Model{
	private id!: number;
	private name!: string;
	private format!: string;
	private picture!: Buffer;
	private productId!: number;
	
	get pictureData(){
		return this.picture;
	}
	
	get pictureId(){
		return this.id;
	}
}

Picture.init({
	id: {
		type: DataTypes.NUMBER,
		autoIncrement: true,
		primaryKey: true
	},
	name: {
		type: new DataTypes.STRING(256),
		allowNull: false
	},
	format: {
		type: new DataTypes.STRING(256),
		allowNull: false
	},
	picture: {
		type: DataTypes.BLOB,
		allowNull: false
	},
	productId: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
},{
	tableName: 'Pictures',
	sequelize
});
