import express from 'express'// para importar express de la forma del ESM (Ecmascript module)
import cors from 'cors'
import 'dotenv/config'
import router from './router'
import { conectDB } from './config/db';
import { corsConfig } from './config/cors';


// const express = require('express'); para importar express de la forma del  Common Js (CJS)

const app = express()//significa que aremos una app de express , es la estancia del servidor 
conectDB()
//leer datos
app.use(express.json())

//Cors
app.use(cors(corsConfig))


app.use('/', router)// use es para mapear las rutas de manera correcta 
// puedes tener varias dependiendo de lo que necesites 

export default app
