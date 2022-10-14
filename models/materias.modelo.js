import { model, Schema } from 'mongoose';

const materiasSchema = new Schema(
    {
        descripcionMateria: {type: String,require: true,},
        profTitular: {type: Schema.Types.ObjectId,ref: 'usuariosModelo'},
        profAux: {type: Schema.Types.ObjectId,ref: 'usuariosModelo'},
        carrera: {type: Schema.Types.ObjectId,ref: 'carrerasModelo'},
        anio: {type: String,required: true},
        horarioIncio: {type: String,require: true,},
        horarioFinal: {type: String,require: true,},
        notas:[
            {
                Alumno: {type: Schema.Types.ObjectId,ref: 'usuariosModelo'},
                parcial1:{type: String,require: true,},
                parcial2:{type: String,require: true,},
                parcial3:{type: String,require: true,},
                recuperatorio:{type: String,require: true,},
                final:{type: String,require: true,},
                estado:{type: String,require: true,},
            }
        ],
        inasistencia: [
        {
          dia: {type: Date, default: Date.now()},
          idUser:{type: Schema.Types.ObjectId,ref: "usuariosModelo",},
        },
      ],
        activo: {type: Boolean,default: true}
    }
    );


export default  model('materiasModelo', materiasSchema);