import express from 'express'// para importar express de la forma del ESM (Ecmascript module)
import cors from 'cors'
import 'dotenv/config'
import router from './router'
import { conectDB } from './config/db';
import { corsConfig } from './config/cors';


// const express = require('express'); para importar express de la forma del  Common Js (CJS)

const app = express()//significa que aremos una app de express , es la estancia del servidor 
conectDB()

app.use(cors(corsConfig))
//leer datos
app.use(express.json())

//Cors



app.use('/', router)// use es para mapear las rutas de manera correcta 
// puedes tener varias dependiendo de lo que necesites 

// Middleware de manejo de errores CORS y generales
app.use((err, req, res, next) => {
    if (err instanceof Error && err.message.includes('CORS')) {
      return res.status(403).json({
        ok: false,
        message: 'Acceso denegado por política de CORS',
      });
    }
    console.error('🔴 Error no manejado:', err);
    res.status(500).json({
      ok: false,
      message: 'Error interno del servidor',
    });
  });
export default app
