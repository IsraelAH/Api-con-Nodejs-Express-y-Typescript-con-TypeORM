// npm run dev
import "reflect-metadata";
import app from './app';
import { AppDataSource } from './db/conexion';




async function main() {
    try {
    await AppDataSource.initialize();
    console.log("Base de datos conectada");
    app.listen(3001,() =>{
    console.log("Server Activo...");
    });
    } catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
        }
    }
}

main();