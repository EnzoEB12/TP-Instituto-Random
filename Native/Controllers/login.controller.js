import usuarioModelo from "../../models/usuarios.modelo.js";
import generar_jwt from "../../helpers/generar_jwt.js";

export const Login = async (req, res) => {
    const { dni, contrasena } = req.body;
  
    try {
      const user = await usuarioModelo.findOne({ dni, contrasena });
  
      //Si no encuentra el usuario
      if (!user) {
        return res.status(401).json({
          msg: "Usuario no existe",
        });
      }
  
      //verificamos si es un usuario activo
      if (!user.activo) {
        res.status(401).json({
          msg: "Usuario no existe",
        });
      }
  
      //Si lo encuentra
      // Generar el token
      const token = await generar_jwt(user.id);
  
      res.json({
        token,
        user //se envia el token generado
      });
    } catch (error) {
      console.log("Error al genera el token: ", error);
    }
  };