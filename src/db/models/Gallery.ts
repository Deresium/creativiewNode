import {Model, DataTypes, Association} from "sequelize";
import {sequelize} from "../../pgConnexion";
import Photo from "./Photo";

export default class Gallery extends Model{
    public id!: number;
    public name!: string;
    public descriptionFr!: string;
    public descriptionEn!: string;
    public photos?: Photo[];
    public static associations: {
        photos: Association<Gallery, Photo>;
    }
}

Gallery.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: new DataTypes.STRING(256),
        allowNull: false
    },
    descriptionFr: {
        type: new DataTypes.STRING(4000),
        allowNull: false
    },
    descriptionEn: {
        type: new DataTypes.STRING(4000),
        allowNull: false
    }
    }, {
        tableName: 'Galleries',
        sequelize
    }
);