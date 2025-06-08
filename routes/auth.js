import { Router } from 'express';
import { crearUsuario } from '../controllers/auth.js';
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

export default router;
