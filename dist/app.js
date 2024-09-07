"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://jaiminho-server.onrender.com',
    'https://jaiiminho-client.vercel.app/',
    'https://jaiminho-client.vercel.app/',
    'https://jaiiminho-client-ly7t0ljzh-gustavohlmas-projects.vercel.app/'
];
app.use(express_1.default.json());
app.use(routes_1.default);
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
exports.default = app;
