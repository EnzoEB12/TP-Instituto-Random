import { model, Schema } from 'mongoose';

const publicacionesSchema = new Schema(
    {
        autorNombre: {type: Schema.Types.ObjectId,ref: "usuariosModelo",},
        materia: {type: Schema.Types.ObjectId,ref: "materiasModelo",},
        tipo: {type: String,required: true,},
        contenido: {type: String,required: true,},
        fecha: {type: Date, default: Date.now(),},
        imagenURL:{type: String,},
        comentarios:[
            {
                autor: {type: Schema.Types.ObjectId,ref: "usuariosModelo",},
                descripcion: {type: String},
                fechaComentario:{type: Date, default: Date.now()},
            },
            {
                timestamps: true,
            }
        ]
    }
    );


export default model('publicacionesModelo', publicacionesSchema);