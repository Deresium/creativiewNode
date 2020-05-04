/*
import request from "supertest";
import app from "../app";
import mangodb from "../mongodb";

beforeEach(async()=>{
    const db = await mangodb();
    await db.connection.db.dropDatabase();
    await db.disconnect();
})

/!*
afterEach(()=>{

})
*!/

test('createInvitation', async()=>{
    await request(app).post('/cn/event').send({
        invitation: {
            mainGuest:{
                name: 'Steinbusch',
                firstName: 'Dimitri',
                email: 'dimitri.steinbusch@hotmail.com'
            },
            guestList: []
        }
    }).expect(200);
})*/
