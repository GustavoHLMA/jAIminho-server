import express from 'express';
import dotenv from 'dotenv';
import router from './routes';
import cors from 'cors';
import session from 'express-session';

dotenv.config();

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://jaiminho-server.onrender.com',
  'https://jaiiminho-client.vercel.app',
  'https://jaiminho-client.vercel.app',
  'https://jaiiminho-client-ly7t0ljzh-gustavohlmas-projects.vercel.app',
  'https://jaiminho-client-aq1e8olqp-gustavohlmas-projects.vercel.app/',
  
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true 
}));

app.options('*', cors());

// Configuração do express-session
app.use(session({
  secret: process.env.SESSION_SECRET || 'sua-chave-secreta',  // Chave secreta para criptografar a sessão
  resave: false,  // Evita salvar a sessão se ela não foi modificada
  saveUninitialized: false,  // Não salva sessões não inicializadas
  cookie: {
    secure: false, // Mantenha como false se estiver em desenvolvimento (sem HTTPS)
    httpOnly: true, // Garante que o cookie seja acessível apenas pelo servidor
    sameSite: 'lax' // Controle como o cookie é enviado nas requisições entre sites
  }  // Ajuste para 'true' em produção com HTTPS
}));

app.use(express.json());
app.use(router);

export default app;
