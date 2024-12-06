"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("colors");
const server_1 = __importDefault(require("./server"));
const port = process.env.PORT || 4000; // variable de sistema  
server_1.default.listen(port, () => {
    console.log(`servidor funcionando en el puerto ${port} `.blue);
});
//# sourceMappingURL=index.js.map