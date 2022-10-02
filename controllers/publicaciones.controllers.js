import publicacionesModelo from '../models/publicaciones.modelo.js';


// Devuelve todos las Publicaciones activas de la colección
export const getPublicaciones = async (req, res) => {
    const publicaciones = await publicacionesModelo.find().populate('autorNombre',["nombre","apellido","fotoURL"]) // consulta para todos los documentos
    
    // Respuesta del servidor
    res.json(publicaciones);
}

// Controlador que almacena una nueva publicación
export const postPublicaciones = async (req, res) => {
    // Desestructuramos la información recibida del cliente 
   const { 
    tipo,
    contenido,
    fecha,
    imagenURL
   } = req.body

   const autorNombre = req.usuario._id

   const publi = new publicacionesModelo({
    autorNombre,
    tipo,
    contenido,
    fecha,
    imagenURL
});
    //console.log(publi)
   await publi.save() 

   res.json({msg: 'La Publicacion se creo correctamente'});
}