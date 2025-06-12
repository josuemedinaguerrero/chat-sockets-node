import Usuario from '../models/usuario.js';

export const usuarioConectado = async (uid = '') => {
  const usuario = await Usuario.findById(uid);
  usuario.online = true;
  await usuario.save();
  return usuario;
};

export const usuarioDesconectado = async (uid = '') => {
  const usuario = await Usuario.findById(uid);
  usuario.online = false;
  await usuario.save();
  return usuario;
};
