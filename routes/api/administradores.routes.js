
// Utilizamos el método Router de la librería express
import { Router } from "express";
const router = Router();
// Requerimos los controladores (funciones que contendrán la lógica del endpoint)
import {
    getAdministrador,
    getAdministradores,
    postAdministrador,
    updateAdministrador,
    deleteAdministrador,
    deleteLogAdministrador
  } from "../../controllers/administrador.controller.js";

import validar_jwt from "../../middlewares/validar_jwt.js";


router.get('/traer-admin/:id',validar_jwt, getAdministrador)
router.get('/traer-admins',validar_jwt, getAdministradores)
router.post('/agregar-admin',validar_jwt, postAdministrador)
router.put('/editar-admin/:id',validar_jwt, updateAdministrador)
router.delete('/eliminar-admin/:id',validar_jwt, deleteLogAdministrador)

export default router;