import mongoose from "mongoose";
import 'colors'
import User from "../models/Users";//modelo
import { IUser } from './../models/Users';//interface

export const conectDB = async () => {
    try {

        const {connection} = await mongoose.connect(process.env.MONGO_URI);
        const url = `${connection.host}:${connection.port}`;

        console.log(('mongoose conected to:' + url).magenta);
    } catch (error) {
        console.log((error.message).red);
        process.exit(1);
    }
}