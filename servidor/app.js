<<<<<<< HEAD
import express from 'express'
import cors from "cors"
import routes from './routes.js'

import { sequelize } from './databases/conecta.js'
import { Expediente } from './models/Expediente.js'
import { Funcionario } from './models/Funcionario.js'
import { Turno } from './models/Turno.js'

const app = express()
const port = 3004

app.use(express.json())
app.use(cors())
app.use(routes)

async function conecta_db() {
    try {
        await sequelize.authenticate();
        console.log('Conexão com banco de dados realizada com sucesso');
        await Expediente.sync()
        await Funcionario.sync()
        await Turno.sync()
    } catch (error) {
        console.error('Erro na conexão com o banco: ', error);
    }
}
conecta_db()

app.get('/', (req, res) => {
    res.send('API do cara foda patroa, meteu no cu do sistema sem antivirus')
})

app.listen(port, () => {
    console.log(`Servidor Rodando na Porta: ${port}`)
=======
import express from 'express'
import cors from "cors"
import routes from './routes.js'

import { sequelize } from './databases/conecta.js'
import { Expediente } from './models/Expediente.js'
import { Funcionario } from './models/Funcionario.js'
import { Turno } from './models/Turno.js'

const app = express()
const port = 3004

app.use(express.json())
app.use(cors())
app.use(routes)

async function conecta_db() {
    try {
        await sequelize.authenticate();
        console.log('Conexão com banco de dados realizada com sucesso');
        await Expediente.sync()
        await Funcionario.sync()
        await Turno.sync()
    } catch (error) {
        console.error('Erro na conexão com o banco: ', error);
    }
}
conecta_db()

app.get('/', (req, res) => {
    res.send('API do cara foda patroa, meteu no cu do sistema sem antivirus')
})

app.listen(port, () => {
    console.log(`Servidor Rodando na Porta: ${port}`)
>>>>>>> fc98836a3c67ae9cdc8bac0a20c712332d782084
})