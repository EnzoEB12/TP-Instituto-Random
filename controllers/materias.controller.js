import materiasModelo from "../models/materias.modelo.js";

// Devuelve todos los Materias activos de la colección
export const getMaterias = async (req, res) => {
  // consulta para todos los documentos
  const materias = await materiasModelo
    .find({ activo: true })
    .populate("profTitular", ["nombre", "apellido", "fotoURL"])
    .populate("profAux", ["nombre", "apellido", "fotoURL"])
    .populate("carrera", ["nombreCarrera"])
    .populate("notas.Alumno", ["nombre", "apellido"]);
  // Respuesta del servidor
  res.json(materias);
};

// Devuelve un solo Materia de la colección
export const getMateria = async (req, res) => {
  const { id } = req.params;
  const materia = await materiasModelo
    .findById(id)
    .populate("profTitular", ["nombre", "apellido", "fotoURL"])
    .populate("profAux", ["nombre", "apellido", "fotoURL"])
    .populate("notas.Alumno", ["nombre", "apellido"]);; // consulta para todos los documentos

  // Respuesta del servidor
  res.json(materia);
};

// Controlador que almacena un nuevo materia
export const postMateria = async (req, res) => {
  // Desestructuramos la información recibida del cliente
  //console.log(req.body)
  const {
    descripcionMateria,
    profTitular,
    profAux,
    carrera,
    anio,
    horarioIncio,
    horarioFinal,
  } = req.body;
  // Se alamacena el nuevo materia en la base de datos
  const materia = new materiasModelo({
    descripcionMateria,
    profTitular,
    profAux,
    carrera,
    anio,
    horarioIncio,
    horarioFinal,
  });
  await materia.save();

  res.json({ msg: "La Materia se creo correctamente" });
};

// Controlador que actualiza información de los Materias
export const updateMateria = async (req, res) => {
  const { id } = req.params;
  const {
    descripcionMateria,
    profTitular,
    profAux,
    carrera,
    anio,
    horarioIncio,
    horarioFinal,
  } = req.body;

  const materia = await materiasModelo.findByIdAndUpdate(
    id,
    {
      descripcionMateria,
      profTitular,
      profAux,
      carrera,
      anio,
      horarioIncio,
      horarioFinal,
    },
    { new: true }
  );

  res.json({
    msg: "Materia actualizada correctamente",
    materia,
  });
};

// Controlador para eliminar un materia de la BD físicamente
export const deleteMateria = async (req, res) => {
  const { id } = req.params;

  try {
    // Ejecución normal del programa
    await materiasModelo.findByIdAndDelete(id);

    res.json({
      msg: "Materia eliminada correctamente",
    });
  } catch (error) {
    // Si ocurre un error
    console.log("Error al eliminar una materia: ", error);
  }
};

// Cambiar el estado activo de un materia (Eliminación lógica)
export const deleteLogMateria = async (req, res) => {
  const { id } = req.params;
  const Materia = await materiasModelo.findByIdAndUpdate(
    id,
    { activo: false },
    { new: true }
  );

  // Respuesta del servidor
  res.json({
    msg: "Materia eliminada correctamente",
    Materia,
  });
};

//TODO: CONTROLADORES PARA LAS NOTAS DE LAS MATERIAS

// Controlador que almacena un nuevo materia
export const postNota = async (req, res) => {
  // Desestructuramos la información recibida del cliente
  //console.log(req.body)
  const { id } = req.params;

  const materia = await materiasModelo.findById(id);

  if (!materia) {
    res.status(404).json({ msg: "La Materia no existe" });
  }

  const { Alumno, parcial1, parcial2, parcial3, recuperatorio, final, estado } =
    req.body;

  // Se alamacena el nuevo materia en la base de datos
  const nuevaNota = {
    Alumno,
    parcial1,
    parcial2,
    parcial3,
    recuperatorio,
    final,
    estado,
  };
  materia.notas.unshift(nuevaNota);
  await materia.save();

  res.json({ msg: "La Nota se creo correctamente" });
};

export const updateNota = async (req, res) => {
  const { id } = req.params;
  try {
    // Ejecución normal del programa
    const materia = await materiasModelo.findById(id);
    //console.log(publi)
    if (!materia) return res.status(404).json({ msg: "La Materia No Existe" });
    const {
      Alumno,
      parcial1,
      parcial2,
      parcial3,
      recuperatorio,
      final,
      estado,
    } = req.body;

    //console.log(req.params.nota_id)
    //console.log(materia.notas[2].parcial1)
    // Document changed in MongoDB, but not in Mongoose
    const nuevaNota = await materiasModelo.updateOne(
      { "notas._id": req.params.nota_id },
      {
        $set: {
          "notas.$.Alumno": Alumno,
          "notas.$.parcial1": parcial1,
          "notas.$.parcial2": parcial2,
          "notas.$.parcial3": parcial3,
          "notas.$.recuperatorio": recuperatorio,
          "notas.$.final": final,
          "notas.$.estado": estado,
        },
      }
    );

    //const test = await materiasModelo.find({"notas._id" : req.params.nota_id}, {"notas.$" : true})
    //await materia.save()
    return res.json({
      msg: "Se Modifico correctamente",
      nuevaNota,
    });
  } catch (error) {
    // Si ocurre un error
    console.log("Error al eliminar una nota: ", error);
  }
};

// Controlador para eliminar un materia de la BD físicamente
export const deleteNota = async (req, res) => {
  const { id } = req.params;

  try {
    // Ejecución normal del programa
    const materia = await materiasModelo.findById(id);
    //console.log(publi)
    if (!materia) return res.status(404).json({ msg: "La Materia No Existe" });

    const nota = await materia.notas.find(
      (nota) => nota.id === req.params.nota_id
    );

    if (!nota) return res.status(404).json({ msg: "La nota no existe" });

    function removeIndex(list) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].id === req.params.nota_id) {
          return i;
        }
      }
    }

    //console.log(indece)
    const remove = removeIndex(materia.notas);
    //console.log(remove)
    materia.notas.splice(remove, 1);

    await materia.save();
    return res.json(materia.notas);
  } catch (error) {
    // Si ocurre un error
    console.log("Error al eliminar una nota: ", error);
  }
};

//TODO: CONTROLADORES PARA LAS INASISTENCIAS

// Controlador que almacena un nuevo materia
export const postInasistencia = async (req, res) => {
  // Desestructuramos la información recibida del cliente
  //console.log(req.body)

  const { id } = req.params;

  const materia = await materiasModelo.findById(id);

  if (!materia) {
    res.status(404).json({ msg: "La Materia no existe" });
  }

  const { dia, idUser } = req.body;

 
  const nuevaInasistencia = { dia, idUser};

  // Se alamacena el inasistencia en la base de datos
  materia.inasistencia.unshift(nuevaInasistencia);
  await materia.save();

  res.json({ msg: "La Inasistencia se creo correctamente", nuevaInasistencia}); 
};

// Controlador para eliminar un materia de la BD físicamente
export const deleteInasistencia = async (req, res) => {
  const { id } = req.params;
//inasistencia_id
  try {

    // Ejecución normal del programa
    const materia = await materiasModelo.findById(id);
    //console.log(materia)
    if (!materia) return res.status(404).json({ msg: "La Materia No Existe" });

    
    const inasistencia = await materia.inasistencia.find(
      (inasistencia) => inasistencia.id === req.params.inasistencia_id
    );
        //console.log(inasistencia)
    if (!inasistencia) return res.status(404).json({ msg: "El registro de inasistencia no existe" });

    function removeIndex(list) {
        for (let i = 0; i < list.length; i++) {
          if (list[i].id === req.params.inasistencia_id) {
            return i;
          }
        }
      }
  
      //console.log(indece)
      const remove = removeIndex(materia.inasistencia);
      //console.log(remove)
      materia.inasistencia.splice(remove, 1);
  
      await materia.save();
      const mensaje = materia.inasistencia
      return res.json({
        msg:'Se elimino Correctamente: ',
        mensaje
      });
  } catch (error) {
    // Si ocurre un error
    console.log("Error al eliminar una inasistencia: ", error);
  }
};

