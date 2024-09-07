"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://jaiminho-server.onrender.com',
    'https://jaiiminho-client.vercel.app',
    'https://jaiminho-client.vercel.app',
    'https://jaiiminho-client-ly7t0ljzh-gustavohlmas-projects.vercel.app',
    'https://jaiminho-client-aq1e8olqp-gustavohlmas-projects.vercel.app/',
];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));
app.options('*', (0, cors_1.default)());
// Configuração do express-session
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || 'sua-chave-secreta', // Chave secreta para criptografar a sessão
    resave: false, // Evita salvar a sessão se ela não foi modificada
    saveUninitialized: true, // Salva novas sessões não modificadas
    cookie: { secure: false } // Ajustar para 'true' em produção, se estiver usando HTTPS
}));
app.use(express_1.default.json());
app.use(routes_1.default);
exports.default = app;
