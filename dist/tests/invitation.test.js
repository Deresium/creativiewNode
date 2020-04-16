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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const mongodb_1 = __importDefault(require("../mongodb"));
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield mongodb_1.default();
    yield db.connection.db.dropDatabase();
    yield db.disconnect();
}));
/*
afterEach(()=>{

})
*/
test('createInvitation', () => __awaiter(void 0, void 0, void 0, function* () {
    yield supertest_1.default(app_1.default).post('/cn/event').send({
        invitation: {
            mainGuest: {
                name: 'Steinbusch',
                firstName: 'Dimitri',
                email: 'dimitri.steinbusch@hotmail.com'
            },
            guestList: []
        }
    }).expect(200);
}));
