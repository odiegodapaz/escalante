import { Funcionario } from '../models/Funcionario.js';
import { Admin } from '../models/Admin.js'; // Importe o modelo de Admin
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Carrega as variáveis de ambiente, como JWT_SECRET

export const funcionarioIndex = async (req, res) => {
    try {
        const funcionarios = await Funcionario.findAll();
        res.status(200).json(funcionarios);
    } catch (error) {
        res.status(400).send(error);
    }
}


// Criar novo funcionário (somente "setorial")
export const funcionarioCreate = async (req, res) => {
    const { matricula, nome, atuacao, setorial, turnoId, expedienteId } = req.body;
    const token = req.headers.authorization?.split(' ')[1]; // Pegando o token de autorização

    // Verifica se o token foi fornecido
    if (!token) {
        return res.status(401).json({ Erro: 'Token de autenticação não fornecido.' });
    }

    try {
        // Verifica o token JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Busca o administrador no banco de dados com base no token
        const admin = await Admin.findByPk(decoded.id);

        // Verifica se é um administrador
        if (!admin || !admin.permissaoCriar) {
            return res.status(403).json({ Erro: 'Permissão negada. Apenas administradores podem criar funcionários.' });
        }

        // Valida os campos obrigatórios
        if (!matricula || !nome) {
            return res.status(400).json({ Erro: "Matrícula e Nome são obrigatórios" });
        }

        // Valida a exclusividade entre 'atuacao' e 'setorial'
        if (atuacao && setorial) {
            return res.status(400).json({ Erro: "Funcionário não pode ser 'atuacao' e 'setorial' ao mesmo tempo" });
        }

        // Cria o novo funcionário
        const novoFuncionario = await Funcionario.create({
            matricula,
            nome,
            atuacao,
            setorial,
            turnoId,
            expedienteId
        });

        // Retorna o novo funcionário criado
        return res.status(201).json(novoFuncionario);

    } catch (error) {
        // Verifica se o erro é relacionado ao token JWT
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ Erro: 'Token inválido ou expirado.' });
        }

        // Em caso de erro, retorna uma mensagem com detalhes
        return res.status(500).json({ Erro: "Erro ao criar funcionário", detalhes: error.message });
    }
};

// Listar funcionários (para "atuacao" e "setorial")
export const getFuncionarios = async (req, res) => {
    try {
        const funcionarios = await Funcionario.findAll();

        return res.status(200).json(funcionarios);
    } catch (error) {
        return res.status(500).json({ Erro: "Erro ao listar funcionários", detalhes: error.message });
    }
};

// Atualizar funcionário (somente "setorial")
export const updateFuncionario = async (req, res) => {
    const { id } = req.params;
    const { nome, atuacao, setorial, turnoId, expedienteId } = req.body;

    try {
        const funcionario = await Funcionario.findByPk(id);

        if (!funcionario) {
            return res.status(404).json({ Erro: "Funcionário não encontrado" });
        }

        // Atualizar os dados do funcionário
        funcionario.nome = nome || funcionario.nome;
        funcionario.atuacao = atuacao ?? funcionario.atuacao;
        funcionario.setorial = setorial ?? funcionario.setorial;
        funcionario.turnoId = turnoId || funcionario.turnoId;
        funcionario.expedienteId = expedienteId || funcionario.expedienteId;

        await funcionario.save();

        return res.status(200).json(funcionario);
    } catch (error) {
        return res.status(500).json({ Erro: "Erro ao atualizar funcionário", detalhes: error.message });
    }
};

// Função para deletar funcionário - Somente Admin pode excluir
export const funcionarioDelete = async (req, res) => {
    const { id } = req.params; // Pegando o ID do funcionário a ser excluído
    const token = req.headers.authorization?.split(' ')[1]; // Pegando o token de autorização

    if (!token) {
        return res.status(401).json({ Erro: 'Token de autenticação não fornecido.' });
    }

    try {
        // Verifica o token JWT para saber se é um admin
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Busca o administrador no banco de dados com base no token
        const admin = await Admin.findByPk(decoded.id);
        
        if (!admin || !admin.permissaoExcluir) {
            return res.status(403).json({ Erro: 'Permissão negada. Apenas administradores podem excluir funcionários.' });
        }

        // Verifica se o funcionário existe no banco de dados
        const funcionario = await Funcionario.findByPk(id);

        if (!funcionario) {
            return res.status(404).json({ Erro: 'Funcionário não encontrado.' });
        }

        // Exclui o funcionário
        await funcionario.destroy();

        res.status(200).json({ Sucesso: 'Funcionário excluído com sucesso.' });
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            res.status(401).json({ Erro: 'Token inválido ou expirado.' });
        } else {
            res.status(500).json({ Erro: 'Erro interno do servidor.' });
        }
    }
};