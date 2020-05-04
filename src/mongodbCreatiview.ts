import mongoose from "mongoose";

let db: typeof mongoose;
const connect = () => {
    mongoose.connect(process.env.URL_MONGO_CREATIVIEW,{useNewUrlParser: true, useUnifiedTopology: true, replicaSet: 'rs'})
        .then((result) => {
            db = result;
        })
        .catch(() => {
            console.log('Impossible to connect');
        })
}

export{
    connect,
    db
}