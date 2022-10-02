import usuarioModelo from '../models/usuarios.modelo.js';


// Devuelve todos los Administradores activos de la colección
export const getAdministradores = async (req, res) => {
    const adminis = await usuarioModelo.find({ activo: true }) // consulta para todos los documentos
    
    // Respuesta del servidor
    res.json(adminis);
}

// Devuelve un solo Administrador de la colección
export const getAdministrador = async (req, res) => {
    const { id } = req.params
    const admin = await usuarioModelo.findById(id) // consulta para todos los documentos
    
    // Respuesta del servidor
    res.json(admin);
}

// Controlador que almacena un nuevo administrador
export const postAdministrador = async (req, res) => {
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
                        administrador
                    }
                ],
                dataAdmin:[
                    {
                        cargo
                    }
                ]
            }
        ],
    } = req.body;
    // Se alamacena el nuevo usuario en la base de datos
    const admin = new usuarioModelo({
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
                        administrador
                    }
                ],
                dataAdmin:[
                    {
                        cargo
                    }
                ]
            }
        ],
    });
    await admin.save() 

    res.json({msg: 'El usuario se creo correctamente'});
}

// Controlador que actualiza información de los Administradores
export const updateAdministrador = async (req, res) => {
    const { id } = req.params
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
                        administrador
                    }
                ],
                dataAdmin:[
                    {
                        cargo
                    }
                ]
            }
        ],
    } = req.body;
 
    const admin = await usuarioModelo.findByIdAndUpdate(id, {
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
                        administrador
                    }
                ],
                dataAdmin:[
                    {
                        cargo
                    }
                ]
            }
        ],
    }, { new: true })
   
    res.json({
        msg: 'Usuario actualizado correctamente',
        admin
    })
}

// Controlador para eliminar un usuario de la BD físicamente
export const deleteAdministrador = async (req, res) => {
    const { id } = req.params;
    
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
export const deleteLogAdministrador = async (req, res) => {
    const { id }  = req.params
    const admin = await usuarioModelo.findByIdAndUpdate(id, { activo: false }, { new: true });

    // Respuesta del servidor
    res.json({
        msg: 'Usuario eliminado correctamente',
        admin
    });
}