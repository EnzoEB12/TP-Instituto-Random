import { model, Schema } from 'mongoose';

const carrerasSchema = new Schema(
    {
        nombreCarrera: {type: String,required: true,},
        activo: {type: Boolean,default: true,},
    }
    );


module.exports = model('carrarasModelo', carrerasSchema);