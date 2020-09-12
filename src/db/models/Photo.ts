import {DataTypes, Model} from "sequelize";
import {sequelize} from "../../pgConnexion";
import Gallery from "./Gallery";

export default class Photo extends Model{
    public id!: number;
    public name!: string;
    public type!: string;
    public picture!: Buffer;
    public galleryId!: number;
}

Photo.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: new DataTypes.STRING(256),
        allowNull: false
    },
    type: {
        type: new DataTypes.STRING(256),
        allowNull: false
    },
    picture: {
        type: DataTypes.BLOB,
        allowNull: false
    },
    galleryId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    tableName: 'Photos',
    sequelize
});
Gallery.hasMany(Photo, {sourceKey: "id", foreignKey: "galleryId", as:"photos"});
Photo.belongsTo(Gallery,{foreignKey: "galleryId", targetKey: "id"});