import { model, Schema } from 'mongoose';

const publicacionesSchema = new Schema(
    {
        autorNombre: {type: Schema.Types.ObjectId,ref: "usuariosModelo",},
        tipo: {type: String,required: true,},
        contenido: {type: String,required: true,},
        fecha: {type: Date,required: true,},
        imagenURL:{type: String,},
        comentarios:[
            {
                autor: {type: Schema.Types.ObjectId,ref: "usuariosModelo",},
                descripcion: {type: String},
                fechaComentario:{type: Date},
            },
            {
                timestamps:{createdAt:true}
            }
        ]
    }
    );


export default model('publicacionesModelo', publicacionesSchema);