import usuarioModelo from "../models/usuarios.modelo.js";
import generar_jwt from "../helpers/generar_jwt.js";
/* import fs from 'fs' */

/* export const test = async (req, res) => {
  try {
    
    console.log(req.file)
      res.json("funcionando")
  } catch (error) {
      console.log(error)
      res.status(500).send('server error')
  }
} */
// Controlador para login del usuario y devolver un token

export const loginUser = async (req, res) => {
  try {
      const user = await usuarioModelo.findById(req.usuario.id).select('-contrasena')
      res.json(user)
  } catch (error) {
      console.log(error)
      res.status(500).send('server error')
  }
}

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
      token, //se envia el token generado
    });
  } catch (error) {
    console.log("Error al genera el token: ", error);
  }
};

// Devuelve todos los Alumnos activos de la colección
export const getAlumnos = async (req, res) => {
  try {
    const alumnos = await usuarioModelo.find({ activo: true }); // consulta para todos los documentos

    // Respuesta del servidor
    res.json(alumnos);
  } catch (error) {
    console.log(" Error al mostrar los usuarios: ", error);
  }
};

// Devuelve un solo Alumno de la colección
export const getAlumno = async (req, res) => {
  const { id } = req.params;
  const alumno = await usuarioModelo.findById(id); // consulta para todos los documentos

  // Respuesta del servidor
  res.json(alumno);
};

// Controlador que almacena un nuevo usuario
export const postAlumno = async (req, res) => {
  
  /* fs.renameSync(req.file.path, req.file.path + '.' + req.file.mimetype.split('/')[1])

  const fotoURL = req.file.path */
  const {
    nombre,
    apellido,
    dni,
    email,
    contrasena,
    fotoURL,
    perfiles: [
      {
        tipo: [{ alumno }],
        dataAlumno: [{ carrera, analitico, certificadoDomicilio }],
      },
    ],
  } = req.body;

  try {
    // Se alamacena el nuevo usuario en la base de datos
    const alum = new usuarioModelo({
      nombre,
      apellido,
      dni,
      email,
      contrasena,
      fotoURL,
      perfiles: [
        {
          tipo: [
            {
              alumno,
            },
          ],
          dataAlumno: [
            {
              carrera,
              analitico,
              certificadoDomicilio,
            },
          ],
        },
      ],
    });
    await alum.save();

    res.json({ msg: "El usuario alumno se creo correctamente" });
  } catch (error) {
    console.log("Error al crear el usuario alumno: ", error);
  }
};

// Controlador que actualiza información de los Alumnos
export const updateAlumno = async (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    apellido,
    dni,
    email,
    contrasena,
    fotoURL,
    perfiles: [
      {
        tipo: [{ alumno }],
        dataAlumno: [{ carrera, analitico, certificadoDomicilio }],
      },
    ],
  } = req.body;

  try {
    const alum = await usuarioModelo.findByIdAndUpdate(
      id,
      {
        nombre,
        apellido,
        dni,
        email,
        contrasena,
        fotoURL,
        perfiles: [
          {
            tipo: [
              {
                alumno,
              },
            ],
            dataAlumno: [
              {
                carrera,
                analitico,
                certificadoDomicilio,
              },
            ],
          },
        ],
      },
      { new: true }
    );

    res.json({
      msg: "Usuario alumno actualizado correctamente",
      alum,
    });
  } catch (error) {
    console.log("Error al actualizar el usuario alumno: ", error);
  }
};

// Controlador para eliminar un usuario de la BD físicamente
export const deleteAlumno = async (req, res) => {
  const { id } = req.params;

  try {
    // Ejecución normal del programa
    await usuarioModelo.findByIdAndDelete(id);

    res.json({
      msg: "Usuario alumno eliminado correctamente",
    });
  } catch (error) {
    // Si ocurre un error
    console.log("Error al eliminar el usuario alumno: ", error);
  }
};

// Cambiar el estado activo de un usuario (Eliminación lógica)
export const deleteLogAlumno = async (req, res) => {
  const { id } = req.params;
  try {
    const alumno = await usuarioModelo.findByIdAndUpdate(
        id,
        { activo: false },
        { new: true }
      );
    
      // Respuesta del servidor
      res.json({
        msg: "Usuario alumno eliminado correctamente",
        alumno,
      });
  } catch (error) {
    console.log("Error al eliminar de forma logica un alumno: ", error)
  }
};
