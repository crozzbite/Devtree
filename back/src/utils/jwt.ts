import jwt, {JwtPayload} from "jsonwebtoken"

export const generateJWT = (payload: JwtPayload) => { //payload es la informacion que quieres colocar en el jwt
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn:'180d', // cada cuanto expira tu token 
    })
    return token
}