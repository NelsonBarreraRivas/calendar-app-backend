/* -------------------------------------------------------------------------- */
/*                               imports package                              */
/* -------------------------------------------------------------------------- */
import express from "express"
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import cors from "cors";
import { connectDB } from "./database/config.js";
import eventsRoutes from "./routes/events.js";

/* -------------------------------------------------------------------------- */
/*                                    Rutas                                   */
/* -------------------------------------------------------------------------- */

dotenv.config()

// Crear el servidor de express

const app = express()

// Base de datos
connectDB()

// CORS

const whiteList = [
    process.env.FRONTEND_URL
];

const corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.includes(origin)) {
            console.log('entro');
            callback(null, true)

        } else {
            console.log('no entro');
            callback(new Error("Error de Cors"))
        }
    },
}

app.use(cors())


// Directorio publico
app.use( express.static('public') )

// Lectura y parseo del body
app.use( express.json() )

// Rutas

// INFO auth // crear, login
app.use('/api/auth', authRoutes)

// INFO events -calendar // POST, GET, PUT, PAT
app.use('/api/events', eventsRoutes)

// Escuchar peticiones

app.listen( process.env.PORT , () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
})
