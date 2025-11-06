import db from '../db/db.js';
import app from '../app.js';
import dotenv from 'dotenv';

dotenv.config();

const server = async () => {
    await db();
    app.listen(process.env.PORT, () => {
        console.log(`✅🚀 Servidor escuchando el puerto ${process.env.PORT}`);
    });
}

server();


