import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Funcionario } from '../models/Funcionario.js'; // Assumindo que Funcionario model já está configurado

dotenv.config(); // Carrega variáveis de ambiente do arquivo .env

// Middleware para verificar o token JWT
export const verificarTokenJWT = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ Erro: 'Token não fornecido. Acesso negado.' });
    }

    // Verifica e valida o token JWT
    jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ Erro: 'Token inválido ou expirado.' });
        }

        // Anexa as informações do token decodificado à requisição
        req.adminId = decoded.id;
        req.adminEmail = decoded.email;

        // Recupera o funcionário logado baseado no ID decodificado
        const funcionario = await Funcionario.findByPk(decoded.id);
        if (!funcionario) {
            return res.status(404).json({ Erro: "Funcionário não encontrado" });
        }

        req.user = { funcionario };
        next();
    });
};

// Middleware para verificar permissões de "setorial"
export const canManageTurno = (req, res, next) => {
    const { funcionario } = req.user; // Assumindo que o funcionário está armazenado na req.user

    if (funcionario.setorial) {
        next(); // Se o funcionário for do tipo "setorial", permite prosseguir
    } else {
        return res.status(403).json({ Erro: "Permissão negada. Você não tem acesso para gerenciar funcionários." });
    }
};

// Middleware para verificar se pode visualizar dados
export const canViewTurno = (req, res, next) => {
    const { funcionario } = req.user;

    if (funcionario.setorial || funcionario.atuacao) {
        next(); // Se o funcionário for do tipo "setorial" ou "atuacao", permite visualizar
    } else {
        return res.status(403).json({ Erro: "Permissão negada. Você não tem acesso para visualizar." });
    }
};

// Middleware para verificar se é administrador (tem todas as permissões)
export const isAdmin = (req, res, next) => {
    const { funcionario } = req.user;

    if (funcionario.permissaoCriar && funcionario.permissaoEditar && funcionario.permissaoExcluir) {
        next(); // Se tiver todas as permissões, permite prosseguir
    } else {
        return res.status(403).json({ Erro: "Permissão negada. Apenas administradores podem realizar essa ação." });
    }
};
