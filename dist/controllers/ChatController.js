"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chatService_1 = __importDefault(require("../services/chatService"));
class ChatController {
    async sendMessage(req, res, next) {
        try {
            const { message } = req.body;
            // Inicializa o userId na sessão
            req.session.userId = req.session.userId || 'defaultUser';
            // Inicializa o histórico, caso ainda não exista
            req.session.history = req.session.history || [];
            // Adiciona a nova mensagem do usuário ao histórico
            req.session.history.push({ role: 'user', content: message });
            // Verifica se a mensagem está sendo recebida corretamente
            console.log('Mensagem recebida do frontend:', message);
            const gptResponse = await chatService_1.default.processMessage(message);
            // Adiciona a resposta da IA ao histórico
            req.session.history.push({ role: 'assistant', content: gptResponse });
            return res.status(200).json({ response: gptResponse });
        }
        catch (error) {
            console.error('Error in ChatController:', error);
            return next(error);
        }
    }
}
exports.default = new ChatController();
