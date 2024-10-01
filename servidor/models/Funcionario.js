<<<<<<< HEAD
import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import { sequelize } from '../databases/conecta.js';
import { Expediente } from './Expediente.js'; // Importação de Expediente
import { Turno } from './Turno.js'; // Importação de Turno

export const Funcionario = sequelize.define('funcionario', {
    matricula: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    atuacao: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }, //tem permissão só para visualizar
    setorial: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },// setorial pode alterar e adicionar funcionarios do seu turno
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Gera um hash da matrícula para usar como senha antes de criar o funcionário
Funcionario.beforeCreate(async (funcionario) => {
    const salt = bcrypt.genSaltSync();
    funcionario.senha = bcrypt.hashSync(funcionario.matricula.toString(), salt);
});

// Associações
Funcionario.belongsTo(Expediente, { foreignKey: 'expedienteId', as: 'expediente' });
Funcionario.belongsTo(Turno, { foreignKey: 'turnoId', as: 'turno' });
=======
import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import { sequelize } from '../databases/conecta.js';
import { Expediente } from './Expediente.js'; // Importação de Expediente
import { Turno } from './Turno.js'; // Importação de Turno

export const Funcionario = sequelize.define('funcionario', {
    matricula: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    atuacao: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }, //tem permissão só para visualizar
    setorial: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },// setorial pode alterar e adicionar funcionarios do seu turno
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Gera um hash da matrícula para usar como senha antes de criar o funcionário
Funcionario.beforeCreate(async (funcionario) => {
    const salt = bcrypt.genSaltSync();
    funcionario.senha = bcrypt.hashSync(funcionario.matricula.toString(), salt);
});

// Associações
Funcionario.belongsTo(Expediente, { foreignKey: 'expedienteId', as: 'expediente' });
Funcionario.belongsTo(Turno, { foreignKey: 'turnoId', as: 'turno' });
>>>>>>> fc98836a3c67ae9cdc8bac0a20c712332d782084
