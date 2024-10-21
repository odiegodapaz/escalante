import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes.js"; // Importa o arquivo de rotas
import { sequelize } from "./databases/conecta.js"; // Importa a conexão com o banco de dados
import { authMiddleware } from "./middlewares/authMiddleware.js"; // Middleware de autenticação

const app = express();
const PORT = 3000; // Porta fixa para localhost

// Middlewares globais
app.use(cors()); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

// Usar as rotas definidas
app.use("/api", routes); 

// Testar conexão com banco de dados
sequelize.authenticate()
    .then(() => {
        console.log("Conexão com banco de dados estabelecida com sucesso.");
    })
    .catch((error) => {
        console.error("Erro ao conectar ao banco de dados:", error);
    });

// Sincronizar os modelos com o banco de dados
sequelize.sync({ alter: true })
    .then(() => {
        console.log("Sincronização com o banco de dados concluída.");
    })
    .catch((error) => {
        console.error("Erro ao sincronizar os modelos com o banco de dados:", error);
    });

// Rota inicial de teste
app.get("/", (req, res) => {
    res.send("API Funcionando!");
});

// Iniciar o servidor em localhost
app.listen(PORT, 'localhost', () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
