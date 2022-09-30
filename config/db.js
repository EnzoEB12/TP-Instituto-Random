//Requerimos la libreria mongoose
import mongoose from "mongoose";
// 

//Ejecutamos la conexion a la BD
//Llamamos al método .connect de mongoose
const connectDB = async () => {
    try {
       await mongoose.connect(process.env.DB, {useNewUrlParser : true,/*  useCreateIndex: true */})
       console.log(' Se establecio conexion con la base de datos ')
    } catch (err) {
       console.error(err.message)
       process.exit(1)
    }
 }
 
export default connectDB