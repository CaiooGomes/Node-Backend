// importando bibiliotecas
import express from "express";
import {fileURLToPath} from "url";
import {dirname} from "path";
import path from "path";

//procurando arquivos
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//criando um servidor express
const app = express();
const port = process.env.PORT || 4444;

//servindo pagina html
app.use(express.static(path.join(__dirname, "public")));

//ligando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})