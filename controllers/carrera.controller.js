import carreraModelo from '../models/carreras.modelo.js';


// Devuelve todos las carreras activas de la colección
export const getCarreras = async (req, res) => {
    const carreras = await carreraModelo.find({activo: true}) // consulta para todos los documentos
    
    // Respuesta del servidor
    res.json(carreras);
}

// Controlador que almacena una nueva carrera
export const postCarrera = async (req, res) => {
     // Desestructuramos la información recibida del cliente

    const { nombreCarrera } = req.body;
    // Se alamacena la nueva carrera en la base de datos
    const carrera = new carreraModelo({ nombreCarrera });
    await carrera.save() 

    res.json({msg: 'La carrera se guardo correctamente'});
}

// Controlador que actualiza información de los Carreras
export const updateCarrera = async (req, res) => {
    const { id } = req.params
    const { nombreCarrera } = req.body;
 
    const carrera = await carreraModelo.findByIdAndUpdate(id, {nombreCarrera}, { new: true })
   
    res.json({
        msg: 'Carrera actualizada correctamente',
        carrera
    })
}

// Controlador para eliminar una carrera de la BD físicamente
export const deleteCarrera = async (req, res) => {
    const { id } = req.params;
    
    try {
        // Ejecución normal del programa
        await carreraModelo.findByIdAndDelete(id)

        res.json({
            msg: 'Carrera eliminada correctamente'
        })
    } catch (error) {
        // Si ocurre un error 
        console.log('Error al eliminar la carrera: ', error)
    }
};

// Cambiar el estado activo de una carrera (Eliminación lógica)
export const deleteLogCarrera = async (req, res) => {
    const { id }  = req.params
    const Carrera = await carreraModelo.findByIdAndUpdate(id, { activo: false }, { new: true });

    // Respuesta del servidor
    res.json({
        msg: 'Carrera eliminada(log) correctamente',
        Carrera
    });
}