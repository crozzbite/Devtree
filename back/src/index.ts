import 'colors'
import server from './server'

const port = process.env.port || 4000 // variable de sistema  

server.listen(port, () => {
    console.log(`servidor funcionando en el puerto ${port} `.blue );
})
//"dev": "node --watch index.js" == dev : nodemon index.js

//type e parecido a interface , herencia y utility types 

type Producto = {
    name : string
    id: number
    price : number
}


interface Producto2  {
    name : string
    id: number
    price : number
    discount : number
    
}

interface FullProduct extends Producto { //se aplica la herencia de un type  a una interface 
        // luck up , hace que el id sea el valor de el id de producto, se puede usar en ambos 
    id: Producto['id']

}
  
type  FullProduct2 = Producto2 & {
image:string
}

type ProductPick =  Pick<Producto, 'id'>

type ProductOmit = Omit<Producto2, 'name' | 'price' >

