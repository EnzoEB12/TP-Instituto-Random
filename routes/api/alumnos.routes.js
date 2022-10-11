//Todo: Tareas por realizar
//Ruta para agregar nuevo alumno
//Ruta para mostrar un solo alumno
//Ruta para mostrar todos los alumnos
//Ruta para editar un solo alumno
//Ruta para eliminar un solo alumno(logica)


// Utilizamos el método Router de la librería express
import { Router } from "express";
const router = Router();

// Requerimos los controladores (funciones que contendrán la lógica del endpoint)
import {
    Login,
    getAlumnos,
    getAlumno,
    postAlumno,
    updateAlumno,
    deleteLogAlumno
  } from "../../controllers/alumnos.controller.js";

import validar_jwt from "../../middlewares/validar_jwt.js";

//Todo: Rutas para alumnos y admins
router.get('/traer-alumno/:id',validar_jwt, getAlumno)
router.post('/login', Login)

//Todos: Ruta para los admins
router.post('/agregar-alumno',validar_jwt, postAlumno)
router.get('/traer-alumnos',validar_jwt, getAlumnos)
router.put('/editar-alumno/:id',validar_jwt, updateAlumno)
router.delete('/eliminar-alumno/:id',validar_jwt, deleteLogAlumno)

export default router;