import { Router } from 'express';

import validarJwt from '../middlewares/validar-jwt.js';

import { obtenerChat } from '../controllers/mensajes.js';

const router = Router();

router.get('/:de', validarJwt, obtenerChat);

export default router;
