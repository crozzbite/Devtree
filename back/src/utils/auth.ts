import bcrypt from 'bcrypt'
import User from '../models/Users'
export const hashPassword = async (password: string) =>{  
      
const salt = await bcrypt.genSalt(10)   // el salt es para hacer una cadena de caracteres unica por si se repiten los paswords no tengan el mismo hash, 
                                        //10 veces se hace , entre mas  mas seguro pero mas lento
    return await bcrypt.hash(password, salt)
}

export const CheckPassword = async(enteredPassword:string, hash: string) =>{
    const result = await bcrypt.compare(enteredPassword, hash)
    return result
}