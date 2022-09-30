import usuarioModelo from '../models/usuarios.modelo.js';


// Devuelve todos los Alumnos activos de la colección
export const getAlumnos = async (req, res) => {
    const alumnos = await usuarioModelo.find({ activo: true }) // consulta para todos los documentos
    
    // Respuesta del servidor
    res.json(alumnos);
}

// Controlador que almacena un nuevo usuario
export const postAlumno = async (req, res) => {
     // Desestructuramos la información recibida del cliente
     //console.log(req.body)    
    const { 
        nombre,
        apellido,
        dni,
        email,
        contrasena,
        fotoURL,
        perfiles:[
            {
                tipo:[
                    {
                        alumno
                    }
                ],
                dataAlumno:[
                    {
                        carrera,
                        analitico,
                        certificadoDomicilio,
                    }
                ]
            }
        ],
    } = req.body;
    // Se alamacena el nuevo usuario en la base de datos
    const alum = new usuarioModelo({
        nombre,
        apellido,
        dni,
        email,
        contrasena,
        fotoURL,
        perfiles:[
            {
                tipo:[
                    {
                        alumno
                    }
                ],
                dataAlumno:[
                    {
                        carrera,
                        analitico,
                        certificadoDomicilio,
                    }
                ]
            }
        ],
    });
    await alum.save() 

    res.json({msg: 'El usuario se creo correctamente'});
}

// Controlador que actualiza información de los Alumnos
export const updateAlumno = async (req, res) => {
    const {  } = req.body
 //!Falta completar
    const alumno = await usuarioModelo.findByIdAndUpdate(id, {}, { new: true })
   
    res.json({
        msg: 'Usuario actualizado correctamente',
        alumno
    })
}

// Controlador para eliminar un usuario de la BD físicamente
export const deleteAlumno = async (req, res) => {
    const { id } = req.body;
    
    try {
        // Ejecución normal del programa
        await usuarioModelo.findByIdAndDelete(id)

        res.json({
            msg: 'Usuario eliminado correctamente'
        })
    } catch (error) {
        // Si ocurre un error 
        console.log('Error al eliminar el usuario: ', error)
    }
};

// Cambiar el estado activo de un usuario (Eliminación lógica)
export const deleteLogAlumno = async (req, res) => {
    const { id }  = req.body
    const alumno = await usuarioModelo.findByIdAndUpdate(id, { activo: false }, { new: true });

    // Respuesta del servidor
    res.json({
        msg: 'Usuario eliminado correctamente',
        alumno
    });
}