import publicacionesModelo from '../models/publicaciones.modelo.js';


// Devuelve todos las Publicaciones activas de la colección
export const getPublicaciones = async (req, res) => {
    try {
        const publicaciones = await publicacionesModelo.find().populate('autorNombre',["nombre","apellido","fotoURL"])
        .populate('comentarios.autor',['nombre', 'apellido']) // consulta para todos los documentos
    
    // Respuesta del servidor
    res.json(publicaciones);
    } catch (error) {
        console.log("Error al traer las publicaciones: ", error)
    }
}

// Devuelve todos las Publicaciones globales de la colección
export const getPublicacionesGlobales = async (req, res) => {
    try {
        const publicaciones = await publicacionesModelo.find({tipo:'Global'}).populate('autorNombre',["nombre","apellido","fotoURL"]) // consulta para todos los documentos
    
    // Respuesta del servidor
    res.json(publicaciones);
    } catch (error) {
        console.log("Error al traer las publicaciones: ", error)
    }
}

// Devuelve todos las Publicaciones globales de la colección
export const getPublicacionesPrivadas = async (req, res) => {
    try {
        const publicaciones = await publicacionesModelo.find({tipo:'Privado'}).populate('autorNombre',["nombre","apellido","fotoURL"]) // consulta para todos los documentos
    
    // Respuesta del servidor
    res.json(publicaciones);
    } catch (error) {
        console.log("Error al traer las publicaciones: ", error)
    }
}

// Devuelve una sola publicacion de la colección
export const getPublicacion = async (req, res) => {
    const { id } = req.params
    try {
        const publi= await publicacionesModelo.findById(id) // consulta para todos los documentos
    
    // Respuesta del servidor
    res.json(publi);
    } catch (error) {
        console.log("Error al traer una publicacion: ", error)
    }
}

// Controlador que almacena una nueva publicación
export const postPublicacion = async (req, res) => {
    // Desestructuramos la información recibida del cliente 
   const { 
    tipo,
    contenido,
    imagenURL
   } = req.body

   try {
    const autorNombre = req.usuario._id

   const publi = new publicacionesModelo({
    autorNombre,
    tipo,
    contenido,
    imagenURL
});
    //console.log(publi)
   await publi.save() 

   res.json({msg: 'La Publicacion se creo correctamente'});
   } catch (error) {
    console.log("Error al crear una publicacion: ", error)
   }
}

// Controlador que actualiza información de las publicaciones
export const updatePublicacion = async (req, res) => {
    const { id } = req.params
    const { 
        contenido,
        imagenURL
    } = req.body;
 
    try {
        const publi = await publicacionesModelo.findByIdAndUpdate(id, {
            contenido,
            imagenURL
        }, { new: true })
       
        res.json({
            msg: 'Publicacion actualizada correctamente',
            publi
        })
    } catch (error) {
        console.log("Error al actualizar la publicacion: ", error)
    }
}

// Controlador para eliminar una publicacion de la BD físicamente
export const deletePublicacion = async (req, res) => {
    const { id } = req.params;
    
    try {
        // Ejecución normal del programa
        await publicacionesModelo.findByIdAndDelete(id)

        res.json({
            msg: 'Publicacion eliminada correctamente'
        })
    } catch (error) {
        // Si ocurre un error 
        console.log('Error al eliminar la publicacion: ', error)
    }
};

//?Controladores para Comentarios

export const getComentarios = async (req, res) =>{
    const {id} = req.params

    const publicacion = await publicacionesModelo.findById(id).populate('comentarios.autor',["nombre","apellido","fotoURL"])

    if(!publicacion){res.status(404).json({msg:'No existe la publicacion'})}
    // Respuesta del servidor
    res.json(publicacion.comentarios);
}

export const postComentarios = async (req, res) =>{
    const { id } = req.params

    const publicacion = await publicacionesModelo.findById(id)

    if(!publicacion){res.status(404).json({msg:'No existe la publicacion'})}
    
        const { 
            descripcion
        } = req.body

        const autor = req.usuario._id;

        const nuevoComentario = {
            autor,
            descripcion
        }
        //console.log(publicacion)
        publicacion.comentarios.unshift(nuevoComentario) 

       await publicacion.save()

        res.json(publicacion.comentarios)
}

export const deleteComentarios = async (req, res) =>{
    const { id } = req.params

    try {
        // Ejecución normal del programa
        const publicacion = await publicacionesModelo.findById(id)
        //console.log(publi)
        if(!publicacion) return res.status(404).json({msg:'La Publicacion No Existe'})

        const comentario = await publicacion.comentarios.find(comentario => comentario.id === req.params.comment_id)
    
        if(!comentario) return res.status(404).json({msg: 'El comentario no existe'})
        
            function removeIndex(list){
                for (let i=0; i < list.length; i++){
                  if (list[i].id === req.params.comment_id){return i}
                }
              }
           
       
        //console.log(indece)
        const remove = removeIndex(publicacion.comentarios)
        publicacion.comentarios.splice(remove,1)

        await publicacion.save(publicacion)
        return res.json(publicacion.comentarios)

    } catch (error) {
        // Si ocurre un error 
        console.log('Error al eliminar el comentario: ', error)
    }
}