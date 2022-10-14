import { param, check } from "express-validator";
import { verificarCampos } from "../helpers/verificarCampos.js";
import carrerasModelo  from "../models/carreras.modelo.js";

export const getCarrerasMidd = [verificarCampos];

export const getCarreraMidd = [
    param("id")
    .isMongoId()
    .withMessage("La Id de la carrera es incorrecta")
  ];

  export const postCarreraMidd = [
    check("nombreCarrera")
      .exists()
      .not()
      .isEmpty()
      .withMessage("El Nombre De La Carrera Es Obligatorio")
      .isString()
      .withMessage("Nombre mal ingresado")
      .custom(async (nombreCarrera) => {
        //console.log(nombreCarrera)
        const carrera = await carrerasModelo.count({ nombreCarrera });
        //console.log(nombreCarrera);
        if ( carrera > 0) {
          return Promise.reject("La carrera ingresada ya se encuentra en la bd");
        }
      }),
    verificarCampos,
  ];