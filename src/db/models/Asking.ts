import {Model, DataTypes, Association} from "sequelize"
import {sequelize} from "../../pgConnexion";
import Photo from "./Photo";

export default class Asking extends Model{
    id!: number;
    fullName!: string;
    email!: string;
    photoId!: number;
    clientId: string | null;
    amount: number | null;
    paymentState: string | null;
    public photo?: Photo;
    public static associations: {
        photo: Association<Asking, Photo>;
    }
}

Asking.init({
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
    photoId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    clientId: {
        type: new DataTypes.STRING(256)
    },
    amount: {
        type: DataTypes.FLOAT
    },
    paymentState: {
        type: new DataTypes.STRING(256)
    }
},{
    tableName: 'Askings',
    sequelize
});
Asking.belongsTo(Photo, {targetKey: "id", foreignKey: "photoId", as: "photo"})