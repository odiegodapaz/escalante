import { Expediente } from '../models/Expediente.js';
import { Funcionario } from '../models/Funcionario.js'; 
import { Turno } from '../models/Turno.js';

// Função para buscar todos os expedientes, seus funcionários e turnos associados
export const buscarExpedientes = async (req, res) => {
    try {
        const expedientes = await Expediente.findAll({
            include: [
                {
                    model: Funcionario,
                    as: 'funcionarios', // Alias usado na associação
                    attributes: ['matricula', 'nome', 'atuacao', 'setorial'], // Campos desejados
                },
                {
                    model: Turno,  // Incluir Turno
                    as: 'turnos',  // Alias usado na associação
                    attributes: ['nome'],  // Campos desejados dos turnos
                }
            ]
        });

        if (!expedientes.length) {
            return res.status(404).json({ mensagem: 'Nenhum expediente encontrado' });
        }

        res.status(200).json(expedientes);

    } catch (error) {
        res.status(500).json({
            Erro: 'Erro ao buscar expedientes',
            detalhes: error.message
        });
    }
};




// Função para cadastrar expedientes e turnos associados
export const cadastrarExpedientes = async (req, res) => {
    const { nome, data, inicio, fim } = req.body;

    // Verifica se todos os campos obrigatórios foram preenchidos
    if (!nome || !data || !inicio || !fim) {
        return res.status(400).json({ Erro: "Nome, data, início e fim são obrigatórios" });
    }

    try {
        // Verifica se o expediente com o mesmo nome já existe
        const expedienteExistente = await Expediente.findOne({ where: { nome } });

        if (expedienteExistente) {
            return res.status(400).json({ Erro: 'Expediente já cadastrado' });
        }

        // Cadastra o novo expediente
        const novoExpediente = await Expediente.create({ nome, data, inicio, fim });

        // Definição de turnos com base no expediente
        let turnos;
        switch (nome) {
            case '241':
                turnos = ['241', '121d', '121n'];
                break;
            case '242':
                turnos = ['242', '122d', '122n'];
                break;
            case '243':
                turnos = ['243', '121d', '121n'];
                break;
            case '244':
                turnos = ['244', '122d', '122n'];
                break;
            default:
                return res.status(400).json({ Erro: 'Expediente inválido' });
        }

        // Criação dos turnos associados ao expediente
        const turnosCriados = [];
        for (const nomeTurno of turnos) {
            const turno = await Turno.create({
                nome: nomeTurno,
                expedienteId: novoExpediente.id // Relaciona o turno com o expediente criado
            });
            turnosCriados.push(turno);
        }

        return res.status(201).json({
            mensagem: 'Expediente e turnos cadastrados com sucesso',
            expediente: novoExpediente,
            turnos: turnosCriados
        });

    } catch (error) {
        return res.status(500).json({ Erro: 'Erro ao cadastrar expediente', detalhes: error.message });
    }
};



// Função para atualizar um expediente e seus turnos
export const atualizarExpediente = async (req, res) => {
    const { id } = req.params; // Recebe o ID do expediente via parâmetro da URL
    const { nome, data, inicio, fim, turnos } = req.body; // Recebe os novos dados para atualizar, incluindo turnos

    try {
        // Busca o expediente pelo ID
        const expediente = await Expediente.findByPk(id, {
            include: [{ model: Turno, as: 'turnos' }]  // Inclui turnos relacionados ao expediente
        });

        // Verifica se o expediente existe
        if (!expediente) {
            return res.status(404).json({ Erro: 'Expediente não encontrado' });
        }

        // Atualiza os dados do expediente
        expediente.nome = nome || expediente.nome;
        expediente.data = data || expediente.data;
        expediente.inicio = inicio || expediente.inicio;
        expediente.fim = fim || expediente.fim;

        // Atualiza os turnos, se fornecidos
        if (turnos && turnos.length > 0) {
            for (let i = 0; i < turnos.length; i++) {
                const turnoExistente = expediente.turnos[i];
                if (turnoExistente) {
                    turnoExistente.nome = turnos[i].nome || turnoExistente.nome;
                    await turnoExistente.save();  // Salva as alterações de cada turno
                }
            }
        }

        // Salva as alterações no banco de dados
        await expediente.save();

        return res.status(200).json({ mensagem: 'Expediente e turnos atualizados com sucesso', expediente });

    } catch (error) {
        return res.status(500).json({ Erro: 'Erro ao atualizar expediente', detalhes: error.message });
    }
};



// Função para excluir um expediente (apenas admins)
export const excluirExpediente = async (req, res) => {
    const { id } = req.params; // Recebe o ID do expediente a ser excluído
    const { user } = req; // Assumindo que o usuário está armazenado no req.user após a autenticação

    try {
        // Verifica se o usuário é administrador
        if (!user || !user.admin) {
            return res.status(403).json({ Erro: 'Acesso negado. Apenas administradores podem excluir expedientes.' });
        }

        // Busca o expediente pelo ID
        const expediente = await Expediente.findByPk(id);

        // Verifica se o expediente existe
        if (!expediente) {
            return res.status(404).json({ Erro: 'Expediente não encontrado' });
        }

        // Exclui o expediente
        await expediente.destroy();

        return res.status(200).json({ mensagem: 'Expediente excluído com sucesso' });

    } catch (error) {
        return res.status(500).json({ Erro: 'Erro ao excluir expediente', detalhes: error.message });
    }
};
