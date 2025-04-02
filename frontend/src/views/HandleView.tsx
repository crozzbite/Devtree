import { Navigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getUserByHandle } from "../api/DevTreeAPI"
import HandleData from "../components/HandleData"

export default function HandleView() {

const params = useParams()
const handle = params.handle! // leemos el handle de la url
const { data, error, isLoading } =useQuery({
  queryFn: () => getUserByHandle(handle), // llamamos a la api para obtener el usuario por su handle
  queryKey: ['handle', handle], // guardamos el handle en la cache
  retry: 1, // si falla la consulta se vuelve a intentar una vez
})

if(isLoading) return <h1 className=" text-center text-white" >Cargando!...</h1>
if(error) return <Navigate to="/404" /> // si hay un error redirigimos a la pagina de error 404
if(data) return <HandleData data={data} /> // si no hay error y tenemos datos, renderizamos el componente HandleData
 
}
