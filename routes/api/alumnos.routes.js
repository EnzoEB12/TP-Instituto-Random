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

router.post('/login', Login)
router.post('/agregar-alumno', postAlumno)
router.get('/traer-alumno/:id', getAlumno)
router.get('/traer-alumnos', getAlumnos)
router.put('/editar-alumno/:id', updateAlumno)
router.delete('/eliminar-alumno/:id', deleteLogAlumno)

export default router;