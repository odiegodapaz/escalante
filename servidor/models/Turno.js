<<<<<<< HEAD
import { DataTypes } from "sequelize";
import { sequelize } from "../databases/conecta.js";
import { Funcionario } from './Funcionario.js'; // Importação de Funcionario

export const Turno = sequelize.define('turno', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(255), // Usar DataTypes.STRING ao invés de VARCHAR
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
Turno.hasMany(Funcionario, { foreignKey: 'turnoId', as: 'funcionarios' });
=======
import { DataTypes } from "sequelize";
import { sequelize } from "../databases/conecta.js";
import { Funcionario } from './Funcionario.js'; // Importação de Funcionario

export const Turno = sequelize.define('turno', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(255), // Usar DataTypes.STRING ao invés de VARCHAR
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
Turno.hasMany(Funcionario, { foreignKey: 'turnoId', as: 'funcionarios' });
>>>>>>> fc98836a3c67ae9cdc8bac0a20c712332d782084
