import usuarioModelo from "../models/usuarios.modelo.js";

// Devuelve todos los Administradores activos de la colección
export const getAdministradores = async (req, res) => {
  try {
    const admins = await usuarioModelo.find({ activo: true }); // consulta para todos los documentos

    // Respuesta del servidor
    res.json(admins);
  } catch (error) {
    console.log("Error al traer los administradores: ", error);
  }
};

// Devuelve un solo Administrador de la colección
export const getAdministrador = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await usuarioModelo.findById(id); // consulta para todos los documentos

    // Respuesta del servidor
    res.json(admin);
  } catch (error) {
    console.log("Error al traer un administrador: ", error);
  }
};

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
    perfiles: [
      {
        tipo: [{ administrador }],
        dataAdmin: [{ cargo }],
      },
    ],
  } = req.body;
  try {
    // Se alamacena el nuevo usuario en la base de datos
    const admin = new usuarioModelo({
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
              administrador,
            },
          ],
          dataAdmin: [
            {
              cargo,
            },
          ],
        },
      ],
    });
    await admin.save();

    res.json({ msg: "El usuario administrador se creo correctamente" });
  } catch (error) {
    console.log("Error al crear un administrador", error);
  }
};

// Controlador que actualiza información de los Administradores
export const updateAdministrador = async (req, res) => {
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
        tipo: [{ administrador }],
        dataAdmin: [{ cargo }],
      },
    ],
  } = req.body;

  try {
    const admin = await usuarioModelo.findByIdAndUpdate(
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
                administrador,
              },
            ],
            dataAdmin: [
              {
                cargo,
              },
            ],
          },
        ],
      },
      { new: true }
    );

    res.json({
      msg: "Usuario administrador actualizado correctamente",
      admin,
    });
  } catch (error) {
    console.log("Error al actualizar un administrador: ", error);
  }
};

// Controlador para eliminar un usuario de la BD físicamente
export const deleteAdministrador = async (req, res) => {
  const { id } = req.params;

  try {
    // Ejecución normal del programa
    await usuarioModelo.findByIdAndDelete(id);

    res.json({
      msg: "Usuario administrador eliminado correctamente",
    });
  } catch (error) {
    // Si ocurre un error
    console.log("Error al eliminar el usuario administrador: ", error);
  }
};

// Cambiar el estado activo de un usuario (Eliminación lógica)
export const deleteLogAdministrador = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await usuarioModelo.findByIdAndUpdate(
      id,
      { activo: false },
      { new: true }
    );

    // Respuesta del servidor
    res.json({
      msg: "Usuario administrador eliminado correctamente",
      admin,
    });
  } catch (error) {
    console.log("Error al borrar de forma logica un admin: ", error);
  }
};
