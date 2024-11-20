import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const LOG_FILE_PATH = path.join(__dirname, 'db.json'); // Caminho para o db.json

/**
 * Função para adicionar um log de ação no JSON Server.
 * @param {string} action - Tipo de ação realizada, ex: "Cadastro", "Atualização", "Exclusão".
 * @param {string} user - Nome ou ID do usuário que realizou a ação.
 * @param {object} data - Dados relacionados à ação, ex: dados cadastrados ou atualizados.
 */
export async function addLog(action, user, data) {
    try {
        // Carrega o arquivo db.json
        const dbData = JSON.parse(fs.readFileSync(LOG_FILE_PATH, 'utf8'));
        
        // Cria um novo log com ID, timestamp e detalhes
        const newLog = {
            id: uuidv4(),
            timestamp: new Date().toISOString(),
            action,
            user,
            data,
        };

        // Adiciona o log ao array existente ou cria um novo se não existir
        dbData.logs = dbData.logs ? [...dbData.logs, newLog] : [newLog];

        // Salva o arquivo atualizado
        fs.writeFileSync(LOG_FILE_PATH, JSON.stringify(dbData, null, 2));
        console.log("Log registrado com sucesso.");
    } catch (error) {
        console.error("Erro ao registrar log:", error);
    }
}
