import Usuario from '../models/usuario.js';

export const getUsuarios = async (req, res = response) => {
  const desde = Number(req.query.dede) || 0;

  const usuarios = await Usuario.find({ _id: { $ne: req.uid } })
    .sort('-online')
    .skip(desde)
    .limit(10);

  res.json({ ok: true, usuarios });
};
