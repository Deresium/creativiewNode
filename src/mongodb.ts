import mongoose from "mongoose";
export default () => {
    mongoose.connect(process.env.URL_MANGO_CN,{useNewUrlParser: true, useUnifiedTopology: true, replicaSet: 'rs'})
        .catch((error: any) => {
            console.log(error);
        });
    }