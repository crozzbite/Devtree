import mongoose, { Schema, Document } from "mongoose";
//schema son como las interfaces en angular 

export interface IUser extends Document { // extend document es para que tenga los metodos de mongo DB
    name : string
    email: string
    password : string
    handle: string
    description: string
    image: string
    links: string
    score: number // Puntuación generada en el resultado del quiz
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
    },
    image:{
        type: String,
        default: ''
    },
    links:{
        type: String,
        default: '[]'
    },
    score:{
        type: Number,
        default: 0
    }
})

const User = mongoose.model<IUser>('User', userSchema)
export default User