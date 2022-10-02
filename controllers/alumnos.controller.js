import usuarioModelo from '../models/usuarios.modelo.js';
import  generar_jwt  from "../helpers/generar_jwt.js"


// Controlador para login del usuario y devolver un token
export const Login = async (req, res) => {
    const { dni, contrasena} = req.body;
    const user = await usuarioModelo.findOne({dni, contrasena});
   
   
    //Si no encuentra el usuario
    if(!user){
        return res.status(401).json({
            msg: "Usuario no existe"
        })
    };

    //verificamos si es un usuario activo
    if(!user.activo){
        res.status(401).json({
            msg: "Usuario no existe"
        })
    }

    //Si lo encuentra
    // Generar el token
    const token = await generar_jwt(user.id); 
    
    res.json({
        msg:"Bienvenido",
        token     //se envia el token generado
    }); 
}

// Devuelve todos los Alumnos activos de la colección
export const getAlumnos = async (req, res) => {
    const alumnos = await usuarioModelo.find({ activo: true }) // consulta para todos los documentos
    
    // Respuesta del servidor
    res.json(alumnos);
}

// Devuelve un solo Alumno de la colección
export const getAlumno = async (req, res) => {
    const { id } = req.params
    const alumno = await usuarioModelo.findById(id) // consulta para todos los documentos
    
    // Respuesta del servidor
    res.json(alumno);
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
 
    const alum = await usuarioModelo.findByIdAndUpdate(id, {
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
    }, { new: true })
   
    res.json({
        msg: 'Usuario actualizado correctamente',
        alum
    })
}

// Controlador para eliminar un usuario de la BD físicamente
export const deleteAlumno = async (req, res) => {
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
export const deleteLogAlumno = async (req, res) => {
    const { id }  = req.params
    const alumno = await usuarioModelo.findByIdAndUpdate(id, { activo: false }, { new: true });

    // Respuesta del servidor
    res.json({
        msg: 'Usuario eliminado correctamente',
        alumno
    });
}