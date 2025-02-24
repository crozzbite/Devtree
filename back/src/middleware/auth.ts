import type { Request, Response, NextFunction } from 'express'
import jwt from "jsonwebtoken";
import User, { IUser } from '../models/Users';

declare global{
    namespace Express{
        interface Request{
            user?: IUser
        }
    }
}

export const authenticate = async (req, res, next) => {
    const bearer = req.headers.authorization;

    if (!bearer) {
      const error = new Error("No Autorizado");
      return res.status(401).json({ error: error.message });
    }
  
    const [, token] = bearer.split("");
  
    if (!token) {
      const error = new Error("No Autorizado");
      return res.status(401).json({ error: error.message });
    }
  
    try {
      const result = jwt.verify(token, process.env.JWT_SECRET);
      if (typeof result === "object" && result.id) {
          const user = await User.findById(result.id).select('-password')//para que ne la respuesta de autorisacion no se traiga toda la informacion aqui omitimos el pass
          if (!user) {
              const error = new Error("El Usuario no existe");
              return res.status(404).json({ error: error.message });
          }
          req.user = user
          next()
      }
    } catch (error) {
      res.status(500).json({ error: "Token no valido" });
    }
}