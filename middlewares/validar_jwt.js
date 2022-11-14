import jwt from "jsonwebtoken";
import usuariosModelo from "../models/usuarios.modelo.js";

// Función para validar los tokens recibidos en las rutas protegidas
const validar_jwt = async (req, res, next) => {
    // Se almacena el token
    const token = req.header('token');
    //console.log(token)
    //Se verficia si viene el token en los headers
    if(!token){
        return res.status(401).json({
            msg: 'Token Inválido'
        });
    }
    //Si existe token

    try {
        // Se decodifica el token para obtener el id 
        const { id } = jwt.verify(token, process.env.jwtSecret)
        //console.log(id)
        if(!id){
            return res.status(401).json({
                msg: 'Token Inválido' 
            });
        }

         //buscar usuario en la base de datos
         const user = await usuariosModelo.findById(id);


         //Se valida el usuario
         if(!user){
            return res.status(401).json({
                msg: 'Token Inválido (no existe el usuario)' 
            });
         }
        // console.log(req.usuario)
        // Se añaden los datos del usuario a la petición.
         req.usuario = user;
        // Continuar al siguiente middleware
         next();


    } catch (error) {
        console.log(error)
        return res.status(401).json({
            msg:'Token inválido (general)'
        })
    }
}
export default  validar_jwt
