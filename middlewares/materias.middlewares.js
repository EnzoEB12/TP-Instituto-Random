import { param, check } from "express-validator";
import { verificarCampos } from "../helpers/verificarCampos.js";
import materiasModelo from "../models/materias.modelo.js";

export const getMateriasMidd = [verificarCampos];

export const getMateriaMidd = [
    param("id")
    .isMongoId()
    .withMessage("La Id de la materia es incorrecta")
  ];

  export const postMateriaMidd = [
    check("descripcionMateria")
      .exists()
      .not()
      .isEmpty()
      .withMessage("El Nombre De La Carrera Es Obligatorio")
      .isString()
      .withMessage("Nombre mal ingresado"),
    verificarCampos,
  ];