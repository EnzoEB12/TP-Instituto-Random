// Utilizamos el método Router de la librería express
import { Router } from "express";
const router = Router();
import validar_jwt from "../../middlewares/validar_jwt.js";
// Requerimos los controladores (funciones que contendrán la lógica del endpoint)
import {
    getMateria,
    getMaterias,
    postMateria,
    updateMateria,
    deleteMateria,

    postNota,
    updateNota,
    deleteNota,

    postInasistencia,
    deleteInasistencia,
  } from "../../controllers/materias.controller.js";


router.get('/ver-materias', getMaterias)
router.post('/guardar-materia', postMateria)

//?Rutas para las notas
router.post('/guardar-nota/:id', postNota)
router.put('/editar-nota/:id/:nota_id', updateNota)
router.delete('/eliminar-nota/:id/:nota_id', deleteNota)

//?Rutas para las inasistencias
router.post('/guardar-inasistencia', postInasistencia)
router.delete('/eliminar-inasistencia', deleteInasistencia)


export default router;