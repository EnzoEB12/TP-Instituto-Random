import { model, Schema } from 'mongoose';

const usuariosSchema = new Schema(
    {
        nombre: {type: String,required: true},
        apellido: {type: String,required: true},
        dni: {type: String,required: true},
        email: {type: String,required: true},
        contrasena: {type: String,required: true},
        fotoURL:{type: String,required: true},
        perfiles: [
            {
                tipo: [
                    {
                        alumno:{type: Boolean,default: false},
                        profesor:{type: Boolean,default: false},
                        administrador:{type: Boolean,default: false},
                    }
                ],
                dataAlumno:[
                    {
                        carrera:{type: String}, 
                        analitico: {type: String},
                        certificadoDomicilio: {type: String},
                    }
                ],
                dataProfesores:[
                    {
                        titulo:{type: String}, 
                    }
                ],
                dataAdmin:[
                    {
                        cargo:{type: String}, 
                    }
                ],
            },
        ],
        activo: {type: Boolean,default: true}
    });


export default  model('usuariosModelo', usuariosSchema);