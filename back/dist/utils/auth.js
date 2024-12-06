"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashPassword = async (password) => {
    const salt = await bcrypt_1.default.genSalt(10); // el salt es para hacer una cadena de caracteres unica por si se repiten los paswords no tengan el mismo hash, 
    //10 veces se hace , entre mas  mas seguro pero mas lento
    return await bcrypt_1.default.hash(password, salt);
};
exports.hashPassword = hashPassword;
//# sourceMappingURL=auth.js.map