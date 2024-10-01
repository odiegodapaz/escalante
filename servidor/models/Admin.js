import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import { sequelize } from '../databases/conecta.js';

export const Admin = sequelize.define('admin', {
    matricula: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    permissaoVisualizar: {
        type: DataTypes.BOOLEAN,
        defaultValue: true  // Pode visualizar tudo
    },
    permissaoCriar: {
        type: DataTypes.BOOLEAN,
        defaultValue: true  // Pode criar qualquer coisa
    },
    permissaoEditar: {
        type: DataTypes.BOOLEAN,
        defaultValue: true  // Pode editar qualquer coisa
    },
    permissaoExcluir: {
        type: DataTypes.BOOLEAN,
        defaultValue: true  // Pode excluir qualquer coisa
    },
}, {
    hooks: {
        beforeCreate: async (admin) => {
            const salt = await bcrypt.genSaltSync(10);
            admin.senha = await bcrypt.hashSync(admin.senha, salt);
        }
    }
});

// Método para comparar a senha fornecida com a senha criptografada no banco
Admin.prototype.validarSenha = function (senha) {
    return bcrypt.compareSync(senha, this.senha);
};
