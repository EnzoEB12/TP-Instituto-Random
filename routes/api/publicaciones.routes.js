

// Utilizamos el método Router de la librería express
import { Router } from "express";

const router = Router();
import validar_jwt from "../../middlewares/validar_jwt.js";

// Requerimos los controladores (funciones que contendrán la lógica del endpoint)
import {
    getPublicaciones,
    getPublicacion,
    postPublicacion,
    updatePublicacion,
    deletePublicacion,
    postPublicacionPrivado,

    getPublicacionesGlobales,
    getPublicacionesPrivadas,
    getPublicacionMateria,

    postComentarios,
    getComentarios,
    deleteComentarios
  } from "../../controllers/publicaciones.controllers.js";

//?: Publicaciones Globales
router.get('/ver-publicaciones-globales',validar_jwt, getPublicacionesGlobales)

//?: Publicaciones Privadas
router.get('/ver-publicaciones-privadas',validar_jwt, getPublicacionesPrivadas)
//?: Publicaciones Privadas
router.get('/ver-publicaciones-materia/:id',validar_jwt, getPublicacionMateria)

//?: Publicaciones Generales
router.get('/ver-publicaciones',validar_jwt, getPublicaciones)
router.get('/ver-publicacion/:id', validar_jwt, getPublicacion)
router.post('/publicar',validar_jwt, postPublicacion)

router.post('/publicar-privado/:id',validar_jwt, postPublicacionPrivado)

router.put('/editar-publicacion/:id',validar_jwt, updatePublicacion)
router.delete('/eliminar-publicacion/:id',validar_jwt, deletePublicacion) 


//?: Comentarios
router.post('/comentar/:id',validar_jwt, postComentarios)
router.get('/ver-comentarios/:id',validar_jwt, getComentarios)
router.delete('/eliminar-comentario/comment/:id/:comment_id', validar_jwt, deleteComentarios)
export default router;