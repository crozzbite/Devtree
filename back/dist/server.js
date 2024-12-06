"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // para importar express de la forma del ESM (Ecmascript module)
require("dotenv/config");
const router_1 = __importDefault(require("./router"));
const db_1 = require("./config/db");
// const express = require('express'); para importar express de la forma del  Common Js (CJS)
const app = (0, express_1.default)(); //significa que aremos una app de express , es la estancia del servidor 
(0, db_1.conectDB)();
//leer datos
app.use(express_1.default.json());
app.use('/', router_1.default); // use es para mapear las rutas de manera correcta 
// puedes tener varias dependiendo de lo que necesites 
exports.default = app;
//# sourceMappingURL=server.js.map