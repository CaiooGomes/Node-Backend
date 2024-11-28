import mongoose, { mongo } from "mongoose";
import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "comida",
    password: "caiobababui.123",
    port: 5432,
});

export const connectDatabase = () => {
    const dbUrl = process.env.dbUrl;
    mongoose.connect(dbUrl);
    const connection = mongoose.connection;

    connection.on("error", () => {
        console.log("Erro ao conectar com o mongoDB");
    })

    connection.on("open", () => {
        console.log("Conectado com o mongoDB");
    })
}

