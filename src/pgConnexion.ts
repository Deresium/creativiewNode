import {Sequelize} from "sequelize"

let sequelize: Sequelize | null = null;
const connect = () => {
    console.log('try to connect...');
    sequelize = new Sequelize(process.env.DATABASE_URL);
    
    /*if(process.env.NODE_ENV !== 'production')
        sequelize.sync({alter: true});*/
    
    const testConnection = async() => {
        try{
            await sequelize.authenticate();
            console.log('connection ok');
        }catch(error){
            console.log('connection error', error);
        }
    }
    testConnection();
}

export{
    connect,
    sequelize
}