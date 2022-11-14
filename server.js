import express from 'express'
import cors from 'cors'
import morgan from "morgan";
import "dotenv/config.js";
import connectDB from './config/db.js'
import { rutas } from './routes/api/index.routes.js'
import path, { join } from 'path'

//conectamos a db
connectDB()

const app = express()
const PORT = process.env.PORT || 5000

//iniciamos el mware
console.log("xd")
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
/* app.use(express.static(join(CURRENT_DIR, './Images'))) */

app.use(morgan("dev"));
app.use(cors())


// RUTAS
app.use("/api", rutas());

app.listen(PORT , () => {
   console.log(`servidor iniciado en el puerto: ${PORT}`)
})






