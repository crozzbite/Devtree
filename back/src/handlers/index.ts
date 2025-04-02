// aqui manejaremos los request y tipos de deteccion para que no este todo revuelto
import { Error } from "mongoose";
import slugify from "slugify";
import formidable  from "formidable";
import { v4 as uuid } from 'uuid';
import User from "../models/Users";
import { Request, Response } from "express";
import { CheckPassword, hashPassword } from "../utils/auth";
import { validationResult } from "express-validator";
import { generateJWT } from "../utils/jwt";
import cloudinary from "../config/cloudinary";

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

export const updateProfile = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    // check de que el handle no esta ocupado ya
    const { description, links } = req.body;

    const handle = slugify(req.body.handle, { lower: true, replacement: "" });
    const handleExist = await User.findOne({ handle });
    if (handleExist && handleExist.email !== req.user.email) {
      const error = new Error("nombre de usuario no disponible");
      return res.status(409).json({ error: error.message });
    }

    // actualizar el usuario
    req.user.description = description;
    req.user.handle = handle;
    req.user.links = links;
    await req.user.save(); //metodo de mongoose para guardar
    res.send("Perfil Actualizado Correctamente");
  } catch (e) {
    const error = new Error("Hubo un error actualizando tu perfil");
    return res.status(500).json({ error: error.message });
  }
};

export const uploadImage = async (req: Request, res: Response):Promise<any> => {
  const form = formidable({ multiples: false });

  try {
    form.parse(req, (error, fields, files) => {
      cloudinary.uploader.upload(files.file[0].filepath,{ public_id: uuid()},async function (error, result) {
          if (error) {
            const error = new Error("Hubo un error al subir tu imagen");
            return res.status(500).json({ error: error.message });
          }
          
          if (result) {
            req.user.image = result.secure_url;
            await req.user.save();
            return res.json({image: result.secure_url});
            
          }
        }
      );
    });
  } catch (e) {
    const error = new Error("Hubo un error actualizando tu perfil");
    return res.status(500).json({ error: error.message });
  }
}

export const getUserByHandle = async (req: Request, res: Response):Promise<any> => {
  try {
    const { handle } = req.params;
    console.log(handle);
    const user = await User.findOne({ handle }).select('-_id -__v -_email -password') // es una consulta a DB para saber si el handle existe
    if(!user){
      const error = new Error("El usuario no existe");
      return res.status(404).json({ error: error.message });
    }
    res.json(user) // genera la respuesta de la DB 
  } catch (e) {
    const error = new Error("Hubo un error actualizando tu perfil");
    return res.status(500).json({ error: error.message });
  }
}

export const searchByHandle = async (req: Request, res: Response): Promise<any> =>{
  try {
    const { handle }= req.body
    const userExist = await User.findOne({handle})
    if(userExist){
      const error = new Error(`${handle} ya esta en uso`)
      return res.status(409).json({error: error.message})
    }
    res.send(`${handle} esta disponible`)
    
  } catch (e) {
    const error = new Error("Hubo un error");
    return res.status(500).json({ error: error.message });
  }
} 
