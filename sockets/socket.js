import { usuarioConectado, usuarioDesconectado } from '../controllers/socket.js';
import { comprobarJWT } from '../helpers/jwt.js';

export default (io) => {
  io.on('connection', (client) => {
    console.log({ HEADERS: client.handshake.headers });

    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);
    console.log({ valido, uid });

    if (!valido) return client.disconnect();

    console.log('Cliente Autenticado');
    usuarioConectado(uid);

    client.join(uid);

    client.on('mensaje-personal', (payload) => {
      console.log({ payload });
      io.to(payload.para).emit('mensaje-personal', payload);
    });

    client.on('disconnect', () => {
      console.log('Cliente desconectado');
      usuarioDesconectado(uid);
    });

    client.on('mensaje', (payload) => {
      console.log('Mensaje', payload);

      io.emit('mensaje', { admin: 'Nuevo mensaje' });
    });
  });
};
