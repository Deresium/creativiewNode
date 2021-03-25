import {Sequelize} from "sequelize"

let dialectOptions = {};
if(process.env.NODE_ENV === 'production'){
    dialectOptions = {
        ssl: {
            rejectUnauthorized: false
        }
    }
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions
});

const connect = async() => {
    console.log('try to connect...');
    try {
        await sequelize.authenticate();
        console.log('sequelize connexion ok');
    }catch(error){
        console.log('sequelize connexion failed');
    }
}

export {
    connect,
    sequelize
}