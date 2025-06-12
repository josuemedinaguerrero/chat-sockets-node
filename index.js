import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import socket from './sockets/socket.js';
import { dbConnection } from './database/config.js';
import authRoutes from './routes/auth.js';
import usuarioRoutes from './routes/usuarios.js';
import mensajesRoutes from './routes/mensajes.js';

dotenv.config();

// DB Conexión
dbConnection();

// App de Express
const app = express();
app.use(express.json());

const server = createServer(app);

// Socket server
const io = new Server(server, { cors: { origin: '*' } });
socket(io);

// Mis rutas
app.use('/api/login', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/mensajes', mensajesRoutes);

server.listen(process.env.PORT, (err) => {
  if (err) throw new Error(err);

  console.log('Servidor corriendo en puerto', process.env.PORT);
});
