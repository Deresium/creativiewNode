import {Model, DataTypes} from "sequelize";
import {sequelize} from "../../../pgConnexion";
import Role from "./Role";
import Roles from "../../../enums/roles";

export default class User extends Model{
	private id!: number;
	private fullName!: string;
	private email!: string;
	private password: string;
	private salted: string;
	private googleId: string;
	private roleCode: Roles;
	
	get userId(){
		return this.id;
	}
	
	get userPassword(){
		return this.password;
	}
	
	get userSalted(){
		return this.salted;
	}
	
	get userRole(): Roles {
		return this.roleCode;
	}
}

User.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	fullName: {
		type: new DataTypes.STRING(256),
		allowNull: false
	},
	email: {
		type: new DataTypes.STRING(256),
		allowNull: false,
		validate: {
			isEmail: true
		}
	},
	password: {
		type: new DataTypes.STRING(1024)
	},
	salted: {
		type: new DataTypes.STRING(1024)
	},
	googleId: {
		type: new DataTypes.STRING(1024)
	},
	roleCode: {
		type: new DataTypes.STRING(10),
		defaultValue: Roles.USER
	}
	
},{
	tableName: 'Users',
	sequelize
});
User.belongsTo(Role, {foreignKey: 'roleCode', targetKey: 'code'});