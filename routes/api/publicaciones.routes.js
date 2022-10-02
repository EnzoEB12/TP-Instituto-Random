//Todo: Tareas por realizar
//Ruta para agregar nueva publicacion
//Ruta para mostrar una sola publicacion
//Ruta para mostrar todas las publicaciones (Dividir por tipo)
//Ruta para eliminar una publicacion

// Utilizamos el método Router de la librería express
import { Router } from "express";
const router = Router();
import validar_jwt from "../../middlewares/validar_jwt.js";
// Requerimos los controladores (funciones que contendrán la lógica del endpoint)
import {
    getPublicaciones,
    postPublicaciones,
  } from "../../controllers/publicaciones.controllers.js";


router.get('/ver-publicaciones',validar_jwt, getPublicaciones)
router.post('/publicar',validar_jwt, postPublicaciones)
/* 
router.get('/ver-publicacion/:id', controlador)
router.put('/editar-publicacion/:id', controlador)
router.delete('/eliminar-publicacion/:id', controlador) 
*/

export default router;