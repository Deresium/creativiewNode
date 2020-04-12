import mongoose from "mongoose";
export default async () => {
    try{
        return await mongoose.connect(`mongodb+srv://taskapp:${process.env.MANGOPW}@c-n-6kjzo.gcp.mongodb.net/test?retryWrites=true&w=majority`,
            {useNewUrlParser: true, useUnifiedTopology: true, replicaSet: 'rs'});
    }catch(error){
        throw error;
    }
 }