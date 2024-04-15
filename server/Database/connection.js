import mongoose from "mongoose";

async function connect(){
    const uri = process.env.MONGODB_URI;

    try{
        const db = await mongoose.connect(uri);
        console.log("DataBase connected");
        return db;
    }catch(error){
        console.log("Invalid uri ", error);
    }
}

export default connect;