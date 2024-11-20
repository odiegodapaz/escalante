// utils/logService.js
const logService = {
    async logAction(action, description) {
        try {
            await fetch('http://localhost:3004/logs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action,
                    description,
                    timestamp: new Date().toISOString(),
                }),
            });
        } catch (error) {
            console.error('Erro ao registrar log:', error);
        }
    },
};

export default logService;
