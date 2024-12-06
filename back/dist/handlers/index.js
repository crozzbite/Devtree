"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccount = void 0;
// aqui manejaremos los request y tipos de deteccion para que no este todo revuelto 
const mongoose_1 = require("mongoose");
const Users_1 = __importDefault(require("../models/Users"));
const slug_1 = __importDefault(require("slug"));
const auth_1 = require("../utils/auth");
//pondremos funciones que se llamaran a nuestas rutas 
const createAccount = async (req, res) => {
    // encontrar emails dublicados 
    const { email, password, handle } = req.body;
    const userExist = await Users_1.default.findOne({ email }); // se traera la primer coincidencia 
    const error = new mongoose_1.Error(process.env.EXISTENT_USER);
    userExist ? { return: res.status(409).json({ error: error.message }) } : console.log('no existe');
    //creacion user
    const user = new Users_1.default(req.body);
    //creasion hash pasword como parte del user
    user.password = await (0, auth_1.hashPassword)(password);
    console.log((0, slug_1.default)(handle));
    //guardado de user
    await user.save();
    res.status(201).send('Registro creado con exito');
};
exports.createAccount = createAccount;
//# sourceMappingURL=index.js.map