import mongoose, { Schema } from "mongoose";
//schema son como las interfaces en angular 

export interface IUser {
    name : string
    email: string
    password : string
    handle: string
    description: string
}

// la interface tiene que ser un reflejo de el schema
const userSchema = new Schema({

    name: {
        //validaciones de el campo
        type: String,
        require: true,
        trim: true
    },

    email: {
        type: String,
        trim: true,
        require: true,// quita espacios al inicio y al final
        unique: true,//wacha que sea el unico 
        lowercase: true,

    },

    password: {
        type: String,
        trim: true,
        require: true
    },

    handle: {
        //validaciones de el campo
        type: String,
        require: true,
        trim: true,
        lowercase: true,
        unique: true,//wacha que sea el unico 

    },
    description:{
        type: String,
        default: '',
    }
})

const User = mongoose.model<IUser>('User', userSchema)
export default User