import { Router } from 'express';

import validarJwt from '../middlewares/validar-jwt.js';

import { getUsuarios } from '../controllers/usuarios.js';

const router = Router();

router.get('/', validarJwt, getUsuarios);

export default router;
