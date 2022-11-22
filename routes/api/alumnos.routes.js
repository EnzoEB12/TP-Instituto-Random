//Todo: Tareas por realizar
//Ruta para agregar nuevo alumno
//Ruta para mostrar un solo alumno
//Ruta para mostrar todos los alumnos
//Ruta para editar un solo alumno
//Ruta para eliminar un solo alumno(logica)
// Utilizamos el método Router de la librería express
import { Router } from "express";
const router = Router();
import upload from "../../libs/storage.js";
// Requerimos los controladores (funciones que contendrán la lógica del endpoint)
import {
    Login,
    getAlumnos,
    getAlumno,
    postAlumno,
    updateAlumno,
    deleteLogAlumno,
    loginUser,
   /*  test */
  } from "../../controllers/alumnos.controller.js";

import {
  getUsuarioMidd,
  getUsuariosMidd,
  postUsuarioMidd
} from "../../middlewares/usuarios.middlewares.js"


import validar_jwt from "../../middlewares/validar_jwt.js";
import {validarAdmin} from "../../middlewares/validarRol.js"
//Todo: Rutas para alumnos y admins
router.get('/traer-alumno/:id',validar_jwt,getUsuarioMidd, getAlumno)
router.post('/login', Login)
router.get('/loginUser',validar_jwt, loginUser)

//Todos: Ruta para los admins
/* router.post('/agregar-alumno',upload.single('fotoURL'),validar_jwt,postUsuarioMidd,validarAdmin, postAlumno) */
router.post('/agregar-alumno',validar_jwt,postUsuarioMidd,validarAdmin, postAlumno)
router.get('/traer-alumnos',validar_jwt,getUsuariosMidd,validarAdmin, getAlumnos)
router.put('/editar-alumno/:id',validar_jwt, updateAlumno)
router.delete('/eliminar-alumno/:id',validar_jwt, deleteLogAlumno)

/* router.post('/test', upload.single('imagen'),test) */

export default router;