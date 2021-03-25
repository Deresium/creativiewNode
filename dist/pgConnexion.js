"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.connect = void 0;
const sequelize_1 = require("sequelize");
let dialectOptions = {};
if (process.env.NODE_ENV === 'production') {
    dialectOptions = {
        ssl: {
            rejectUnauthorized: false
        }
    };
}
const sequelize = new sequelize_1.Sequelize(process.env.DATABASE_URL, {
    dialectOptions
});
exports.sequelize = sequelize;
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('try to connect...');
    try {
        yield sequelize.authenticate();
        console.log('sequelize connexion ok');
    }
    catch (error) {
        console.log('sequelize connexion failed');
    }
});
exports.connect = connect;
//# sourceMappingURL=pgConnexion.js.map