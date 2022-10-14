//import usuariosModelo from "../models/usuarios.modelo.js";

export const validarAdmin = (req, res, next) =>{
    const rol = req.usuario.perfiles[0].tipo[0].administrador

    //verificamos en la BD si el usuario tiene el rol de Admin
    if(rol !== true){

        return res.status(401).json({
            msg:"No tiene permisos"
        })
};
    next(); 
}