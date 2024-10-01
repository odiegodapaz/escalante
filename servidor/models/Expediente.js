<<<<<<< HEAD
import { DataTypes } from "sequelize";
import { sequelize } from "../databases/conecta.js";
import { Funcionario } from './Funcionario.js'; // Importação de Funcionario

export const Expediente = sequelize.define('expediente', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(255), // Usar DataTypes.STRING ao invés de VARCHAR
        allowNull: false
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false
    },
    inicio: {
        type: DataTypes.TIME,
        allowNull: false
    },
    fim: {
        type: DataTypes.TIME,
        allowNull: false
    }
});

// Associações
Expediente.hasMany(Funcionario, { foreignKey: 'expedienteId', as: 'funcionarios' });
=======
import { DataTypes } from "sequelize";
import { sequelize } from "../databases/conecta.js";
import { Funcionario } from './Funcionario.js'; // Importação de Funcionario

export const Expediente = sequelize.define('expediente', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(255), // Usar DataTypes.STRING ao invés de VARCHAR
        allowNull: false
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false
    },
    inicio: {
        type: DataTypes.TIME,
        allowNull: false
    },
    fim: {
        type: DataTypes.TIME,
        allowNull: false
    }
});

// Associações
Expediente.hasMany(Funcionario, { foreignKey: 'expedienteId', as: 'funcionarios' });
>>>>>>> fc98836a3c67ae9cdc8bac0a20c712332d782084
