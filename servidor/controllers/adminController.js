import { Admin } from '../models/Admin.js'; // Importe o modelo Admin
import jwt from 'jsonwebtoken'; // Para geração de tokens JWT
import dotenv from 'dotenv'; // Para carregar variáveis de ambiente
import bcrypt from 'bcrypt';

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

// Função para cadastrar um novo administrador
export const adminCreate = async (req, res) => {
    const { matricula, nome, email, senha, permissaoVisualizar, permissaoCriar, permissaoEditar, permissaoExcluir } = req.body;

    // Validação dos campos obrigatórios
    if (!matricula || !nome || !email || !senha) {
        return res.status(400).json({ Erro: "Matrícula, Nome, Email e Senha são obrigatórios" });
    }

    try {
        // Verifica se o email já está cadastrado
        const adminExistente = await Admin.findOne({ where: { email } });
        if (adminExistente) {
            return res.status(400).json({ Erro: "Já existe um administrador com esse email" });
        }

        // Cria o novo administrador com permissões
        const novoAdmin = await Admin.create({
            matricula,
            nome,
            email,
            senha, // A senha será criptografada no hook beforeCreate
            permissaoVisualizar,
            permissaoCriar,
            permissaoEditar,
            permissaoExcluir
        });

        // Gera um token JWT para o administrador
        const token = jwt.sign(
            { id: novoAdmin.matricula, email: novoAdmin.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // O token expira em 1 hora
        );

        // Retorna o administrador criado junto com o token
        return res.status(201).json({
            mensagem: 'Administrador cadastrado com sucesso!',
            admin: novoAdmin,
            token
        });

    } catch (error) {
        return res.status(500).json({ Erro: "Erro ao cadastrar administrador", detalhes: error.message });
    }
};

// Função para autenticar o administrador (login)
export const adminLogin = async (req, res) => {
    const { email, senha } = req.body;

    // Validação dos campos obrigatórios
    if (!email || !senha) {
        return res.status(400).json({ Erro: "Email e Senha são obrigatórios" });
    }

    try {
        // Verifica se o administrador existe
        const admin = await Admin.findOne({ where: { email } });
        if (!admin) {
            return res.status(404).json({ Erro: "Administrador não encontrado" });
        }

        // Verifica se a senha está correta
        const senhaValida = admin.validarSenha(senha);
        if (!senhaValida) {
            return res.status(401).json({ Erro: "Senha incorreta" });
        }

        // Gera um token JWT
        const token = jwt.sign(
            { id: admin.matricula, email: admin.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Retorna o token e os detalhes do administrador
        return res.status(200).json({
            mensagem: 'Login realizado com sucesso!',
            admin,
            token
        });

    } catch (error) {
        return res.status(500).json({ Erro: "Erro ao realizar login", detalhes: error.message });
    }
};
