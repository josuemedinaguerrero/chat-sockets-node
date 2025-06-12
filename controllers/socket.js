import Mensaje from '../models/mensaje.js';
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

export const grabarMensaje = async (payload) => {
  try {
    const message = new Mensaje(payload);
    await message.save();

    return true;
  } catch (error) {
    return false;
  }
};
