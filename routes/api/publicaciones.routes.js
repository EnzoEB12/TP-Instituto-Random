//Todo: Tareas por realizar
//Ruta para agregar nueva publicacion
//Ruta para mostrar una sola publicacion
//Ruta para mostrar todas las publicaciones (Dividir por tipo)
//Ruta para eliminar una publicacion

// Utilizamos el método Router de la librería express
import { Router } from "express";
const router = Router();

// Requerimos los controladores (funciones que contendrán la lógica del endpoint)

router.post('/publicar', controlador)
router.get('/ver-publicacion/:id', controlador)
router.get('/ver-publicaciones', controlador)
router.put('/editar-publicacion/:id', controlador)
router.delete('/eliminar-publicacion/:id', controlador)