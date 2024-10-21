import { Router } from "express";
import { cadastrarExpedientes, buscarExpedientes, atualizarExpediente, excluirExpediente } from './controllers/expedienteController.js';
import { funcionarioCreate, funcionarioDelete } from './controllers/funcionarioController.js';
import { cadastrarTurno, buscarTurnos } from './controllers/turnoController.js';
import { cadastrarAdmin } from './controllers/adminController.js';
import { authMiddleware, isAdmin } from './middlewares/authMiddleware.js';
import { canManageTurno, canViewTurno } from './middlewares/permissionsMiddleware.js';

const router = Router();

// Rotas para administradores
router.post('/admin/cadastrar', cadastrarAdmin); // Cadastro de admin

// Rotas para funcionários
router.post('/funcionario/cadastrar', authMiddleware, isAdmin, funcionarioCreate); // Cadastro de funcionário (apenas admins)
router.delete('/funcionario/:id', authMiddleware, isAdmin, funcionarioDelete); // Excluir funcionário (apenas admins)

// Rotas para expedientes
router.post('/expediente/cadastrar', authMiddleware, isAdmin, cadastrarExpedientes); // Cadastro de expediente (apenas admins)
router.get('/expedientes', authMiddleware, buscarExpedientes); // Busca de todos os expedientes
router.put('/expediente/:id', authMiddleware, isAdmin, atualizarExpediente); // Atualização de expediente (apenas admins)
router.delete('/expediente/:id', authMiddleware, isAdmin, excluirExpediente); // Exclusão de expediente (apenas admins)

// Rotas para turnos
router.post('/turno/cadastrar', authMiddleware, isAdmin, cadastrarTurno); // Cadastro de turno (apenas admins)
router.get('/turnos', authMiddleware, canViewTurno, buscarTurnos); // Busca de turnos (somente funcionários com permissão de visualização)

export default router;
