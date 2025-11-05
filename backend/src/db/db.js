import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const db = async () => {
    try {
        const uri = process.env.URI_MONGO;
        await mongoose.connect(uri);
    } catch (err) {
        console.log(`⛔️ ERROR - no se ha podido establecer la conexión`);
        console.log(err);
    }
};

export default db;
