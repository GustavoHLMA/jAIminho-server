import express from 'express';
import dotenv from 'dotenv';
import router from './routes';
import cors from 'cors';

dotenv.config();

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://jaiminho-server.onrender.com',
  'https://jaiiminho-client.vercel.app/',
  'https://jaiminho-client.vercel.app/',
  'https://jaiiminho-client-ly7t0ljzh-gustavohlmas-projects.vercel.app/'
]

app.use(express.json());
app.use(router);
app.use(cors({
  origin: allowedOrigins
}));

export default app;
