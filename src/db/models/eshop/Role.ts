import {Model, DataTypes} from "sequelize";
import {sequelize} from "../../../pgConnexion";
import Roles from "../../../enums/roles";

export default class Role extends Model{
	private code!: Roles;
	private wording!: string;
}

Role.init({
	code: {
		type: new DataTypes.STRING(10),
		primaryKey: true
	},
	wording: {
		type: new DataTypes.STRING(64),
		allowNull: false
	}
},{
	tableName: 'Roles',
	sequelize
});