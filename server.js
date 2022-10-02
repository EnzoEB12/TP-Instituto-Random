import express from 'express'
import cors from 'cors'
import morgan from "morgan";
import "dotenv/config.js";
import connectDB from './config/db.js'
import { rutas } from './routes/api/index.routes.js'
connectDB()

const app = express()
const PORT = process.env.PORT || 


//iniciamos el mware
console.log("xd")
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//conectamos a db



app.use(morgan("dev"));
app.use(cors())


// RUTAS
app.use("/api", rutas());



app.listen(PORT , () => {
   console.log(`servidor iniciado en el puerto: ${PORT}`)
})






