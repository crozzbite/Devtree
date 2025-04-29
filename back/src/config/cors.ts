import {CorsOptions} from 'cors'
console.log(process.argv)//argument vector

export const corsConfig : CorsOptions ={
    origin: function (origin , callback) {

        // areglo de dominios permitidos para poder seguir usando thunderclient
        const whiteList = [process.env.FRONTEND_URL]// se llena con llos dominios que le mandemos

        // si no hay el argumento  '--api' al ejecutar entonces no ejecuta conecciones externas como thunder client 
        if ( process.argv[2] === '--api') {
            whiteList.push(undefined)
        }

        if (whiteList.includes(origin)){
            callback(null, true)      
        }else {
            console.error('CORS bloqueado para:', origin);

            callback(new Error('Error de CORS'));
        }
    },
    credentials: true, //  Muy importante si estás usando cookies o auth headers

};