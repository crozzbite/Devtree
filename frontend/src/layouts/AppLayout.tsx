
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/DevTreeAPI";
import DevTree from "../components/DevTree";
import { Navigate } from "react-router-dom";

export default function AppLayout() {

const {data, isLoading, isError} = useQuery({
    queryFn: getUser, // este es el handler
    queryKey:['user'], // es un nombre para identificar unico , te indicara si pones el mismo en otras 
    retry: 1, //para ver cuantas veces  tratara de hacer la coneccion si falla
    refetchOnWindowFocus: false //para que no aga otra peticion al cambiar de una ventana del navegador a otra
}) 

if (isLoading) return 'Cargando...'
if(isError) {
    return <Navigate to={'/auth/login'}/>
    
}

    
    if(data) return <DevTree data={data} /> // renderisa el componente del nombre puesto 
}