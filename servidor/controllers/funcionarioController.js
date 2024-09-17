import { Funcionario } from 'models/Funcionario.js';

export const funcionarioIndex = async (req, res) => {
    try {
        const funcionarios = await Funcionario.findAll();
        res.status(200).json(funcionarios);
    } catch (error) {
        res.status(400).send(error);
    }
}

export const funcionarioCreate = async (req, res) => {
    const { matricula, nome, atuacao, setorial } = req.body;

    if (!matricula || !nome) {
        res.status(400).json({ Erro: "Matrícula e Nome são obrigatórios" });
        return;
    }

    // Verifica se tanto "atuacao" quanto "setorial" foram fornecidos
    if (atuacao && setorial) {
        res.status(400).json({ Erro: "Funcionário não pode ser cadastrado como 'Coordenador de Atuação' e 'Coordenador Setorial' ao mesmo tempo." });
        return;
    }

    try {
        const funcionario = await Funcionario.create({ matricula, nome, atuacao, setorial });
        res.status(201).json(funcionario);
    } catch (error) {
        res.status(400).send(error);
    }
};
