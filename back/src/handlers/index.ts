// aqui manejaremos los request y tipos de deteccion para que no este todo revuelto
import { Error } from "mongoose";
import slugify from "slugify";
import User from "../models/Users";
import { Request, Response } from "express";
import { CheckPassword, hashPassword } from "../utils/auth";
import { validationResult } from "express-validator";
import { generateJWT } from "../utils/jwt";

//pondremos funciones que se llamaran a nuestas rutas
export const createAccount = async (
  req: Request,
  res: Response
): Promise<any> => {
  // encontrar emails dublicados
  const { email, password } = req.body;

  const userExist = await User.findOne({ email }); // se traera la primer coincidencia
  if (userExist) {
    const error = new Error(process.env.EXISTENT_USER);
    return res.status(409).json({ error: error.message });
  }

  // modificacion para un buen handle
  const handle = slugify(req.body.handle, { lower: true, replacement: "" });
  const handleExist = await User.findOne({ handle });
  if (handleExist) {
    const error = new Error("nombre de usuario no disponible");
    return res.status(409).json({ error: error.message });
  }

  //creacion user
  const user = new User(req.body);
  //creasion hash pasword como parte del user
  user.password = await hashPassword(password);
  //    creacion de handle
  user.handle = handle;
  //guardado de user
  await user.save();

  res.status(201).send("Registro creado con exito");
};

export const login = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //revisar si el usuario existe
  const user = await User.findOne({ email }); // se traera la primer coincidencia
  if (!user) {
    const error = new Error("El Usuario no existe");
    return res.status(404).json({ error: error.message });
  }

  //comporbar el pw

  const isPasswordCorrect = await CheckPassword(password, user.password);
  if (!isPasswordCorrect) {
    const error = new Error("Pasword incorrecto");
    return res.status(401).json({ error: error.message });
  }

  const token = generateJWT({ id: user.id });

  res.send(token);
};

export const getUser = async (req: Request, res: Response):Promise<any> => {
  res.json(req.user)
};
