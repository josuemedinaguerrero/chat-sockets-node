import Mensaje from '../models/mensaje.js';

export const obtenerChat = async (req, res) => {
  const miId = req.uid;
  const mensajesDe = req.params.de;

  const mensajes = await Mensaje.find({
    $or: [
      { de: miId, para: mensajesDe },
      { de: mensajesDe, para: miId },
    ],
  })
    .sort({ createdAt: 'desc' })
    .limit(30);

  res.json({ ok: true, mensajes });
};
