import mongoose from "mongoose";
export default async () => {
    try{
        return await mongoose.connect(process.env.URL_MONGO_CREATIVIEW,
            {useNewUrlParser: true, useUnifiedTopology: true, replicaSet: 'rs'});
    }catch(error){
        throw error;
    }
}