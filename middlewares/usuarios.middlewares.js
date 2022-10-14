import { param, check } from "express-validator";
import { verificarCampos } from "../helpers/verificarCampos.js";
import usuariosModelo  from "../models/usuarios.modelo.js";



export const getUsuariosMidd = [verificarCampos];

export const getUsuarioMidd = [
    param("id")
    .isMongoId()
    .withMessage("La Id es incorrecta")
  ];

  export const postUsuarioMidd = [
    check("nombre")
        .exists()
        .not()
        .isEmpty()
        .withMessage("El Nombre Es Obligatorio")
        .isString()
        .withMessage("Nombre mal ingresado")
        .custom(
          async (nombre) => {
              //console.log(nombre)
            const user = await usuariosModelo.count({nombre});
            //console.log(user);
            if (user > 0) {
              return Promise.reject("El Nombre ingresado ya se encuentra en la bd");
            }
          },
        ),
      check("apellido")
        .exists()
        .not()
        .isEmpty()
        .withMessage("El Nombre Es Obligatorio")
        .isString()
        .withMessage("Nombre mal ingresado"),
      check("dni")
        .exists()
        .not()
        .isEmpty()
        .withMessage("El DNI Es Obligatorio")
        .custom(
          async (dni) => {
              //console.log(dni)
            const userDNI = await usuariosModelo.count({dni});
            //console.log(userDNI);
            if (userDNI > 0) {
              return Promise.reject("El DNI ingresado ya se encuentra en la bd");
            }
          },
        ),
        check("email")
        .exists()
        .not()
        .isEmpty()
        .withMessage("El Nombre Es Obligatorio")
        .isEmail()
        .withMessage("GMAIL mal ingresado")
        .custom(
          async (email) => {
              //console.log(dni)
            const correo = await usuariosModelo.count({email});
            //console.log(correo);
            if (correo > 0) {
              return Promise.reject("El correo electronico ingresado ya se encuentra en la bd");
            }
          },
        ),
        check("contrasena")
        .exists()
        .not()
        .isEmpty()
        .withMessage("El Nombre Es Obligatorio")
        .isString()
        .withMessage("Nombre mal ingresado")
        .isLength({min: 6})
        .withMessage("La contraseña debe tener minimo 6 caracteres"),
    verificarCampos,
  ];

