import { response } from 'express';
import Usuario from '../models/usuario.js';

export const crearUsuario = async (req, res = response) => {
  try {
    const { email } = req.body;

    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
      return res.status(400).json({ ok: false, msg: 'El correo ya está registrado' });
    }

    const usuario = Usuario(req.body);
    await usuario.save();

    res.json({ ok: true, usuario: usuario });
  } catch (error) {
    res.status(500).json({ ok: false, msg: error.message });
  }
};
