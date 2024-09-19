// importando bibiliotecas
import express from "express";
import {fileURLToPath} from "url";
import {dirname} from "path";
import path from "path";
import testRouter from "./routes/TestRoute.js"
import productrouter from "./routes/ProductRouter.js";
import { connectDatabase } from "./config/database.js";
import { config } from "dotenv";
config();

//procurando arquivos
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//criando um servidor express
const app = express();
const port = process.env.PORT || 4444;

//permitindo backend usar json
app.use(express.json());

//colocando rota em uso
app.use("/exemplo", testRouter)
app.use("/products", productrouter)

//servindo pagina html
app.use(express.static(path.join(__dirname, "public")));

//ligando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})

connectDatabase();