
// Utilizamos el método Router de la librería express
import { Router } from "express";
const router = Router();

// Requerimos los controladores (funciones que contendrán la lógica del endpoint)
import {
    getCarreras,
    postCarrera,
    updateCarrera,
    deleteCarrera,
    deleteLogCarrera
  } from "../../controllers/carrera.controller.js";


router.get('/ver-carreras',getCarreras)
router.post('/agregar-carrera', postCarrera)
router.put('/editar-carreras/:id',updateCarrera)
router.delete('/eliminar-carreras/:id',deleteCarrera)
//router.put('/eliminar-log-carreras',getCarreras)

export default router;