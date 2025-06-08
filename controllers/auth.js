import { response } from 'express';
import Usuario from '../models/usuario.js';
import bcrypt from 'bcryptjs';
import { generarJWT } from '../helpers/jwt.js';

export const crearUsuario = async (req, res = response) => {
  try {
    const { email, password } = req.body;

    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) return res.status(400).json({ ok: false, msg: 'El correo ya está registrado' });

    const usuario = Usuario(req.body);

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    // Generar JWT
    const token = await generarJWT(usuario.id);

    res.json({ ok: true, usuario: usuario, token });
  } catch (error) {
    res.status(500).json({ ok: false, msg: error.message });
  }
};

export const login = async (req, res = response) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(400).json({ ok: false, msg: 'Email no encontrado' });

    // Validar password
    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) return res.status(400).json({ ok: false, msg: 'La contraseña no es válida' });

    // Generar JWT
    const token = await generarJWT(usuario.id);

    res.json({ ok: true, usuario: usuario, token });
  } catch (error) {
    res.status(500).json({ ok: false, msg: error.message });
  }
};
