"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.conectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require("colors");
const conectDB = async () => {
    try {
        const { connection } = await mongoose_1.default.connect(process.env.MONGO_URI);
        const url = `${connection.host}:${connection.port}`;
        console.log(('mongoose conected to:' + url).magenta);
    }
    catch (error) {
        console.log((error.message).red);
        process.exit(1);
    }
};
exports.conectDB = conectDB;
//# sourceMappingURL=db.js.map