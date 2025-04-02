import { useQueryClient } from '@tanstack/react-query'

export default function AdminNavigation() {
    const queryClient = useQueryClient()

    const logout = () => {// aqui se cierra secion invalidando la querty y removiendo el auth token 
        localStorage.removeItem('AUTH_TOKEN')
        queryClient.invalidateQueries({queryKey: ['user']})
    }
    return (
        <button
            className=" bg-lime-500 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
            onClick={logout}
        >
            Cerrar Sesión
        </button>
    )
}
