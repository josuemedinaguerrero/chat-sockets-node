import { Router } from 'express';
import { crearUsuario, login } from '../controllers/auth.js';
import { check } from 'express-validator';
import validarCampos from '../middlewares/validar-campos.js';
const router = Router();

router.post(
  '/new',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    validarCampos,
  ],
  crearUsuario
);

router.post(
  '/',
  [check('password', 'La contraseña es obligatoria').not().isEmpty(), check('email', 'El correo es obligatorio').isEmail(), validarCampos],
  login
);

export default router;
