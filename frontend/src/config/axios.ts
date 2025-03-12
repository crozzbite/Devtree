import axios from "axios";
// este es un intreceptor que ayuda a ponerle el token a todas las peticiones
const api = axios.create({
    baseURL: import.meta.env.VITE_BACK_URL
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('AUTH_TOKEN')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})
export default api