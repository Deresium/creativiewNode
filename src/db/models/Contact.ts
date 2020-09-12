import {Model, DataTypes} from "sequelize"
import {sequelize} from "../../pgConnexion";

export default class Contact extends Model {
    public id!: number;
    public email!: string;
    public firstName!: string;
    public message!: string;
    public name!: string;
}

Contact.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: new DataTypes.STRING(256),
            allowNull: false,
            validate:{
                isEmail: true
            }
        },
        firstName: {
            type: new DataTypes.STRING(256),
            allowNull: false
        },
        name: {
            type: new DataTypes.STRING(256),
            allowNull: false
        },
        message: {
            type: new DataTypes.STRING(4000),
            allowNull: false
        }
    },
    {
        tableName: 'Contacts',
        sequelize
    }
)