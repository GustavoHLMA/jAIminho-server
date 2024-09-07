import { Request, Response, NextFunction } from 'express';
import ChatService from '../services/chatService';

class ChatController {
  async sendMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const { message } = req.body;
      
      // Verifica se a mensagem está sendo recebida corretamente
      console.log('Mensagem recebida do frontend:', message);

      const gptResponse = await ChatService.processMessage(message);

      return res.status(200).json({ response: gptResponse });
    } catch (error) {
      console.error('Error in ChatController:', error);
      return next(error);  
    }
  }
}

export default new ChatController();
