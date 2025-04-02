import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import {isAxiosError} from "axios";
import { toast } from "sonner";
import ErrorMessage from "../components/ErrorMessage";
import type { RegisterForm } from "../types"
import api from "../config/axios";


export default function RegisterView() {
    const location = useLocation()
    const navigate = useNavigate() 
    const initalValues : RegisterForm = {
       name: '',
       email: '',
       handle: location?.state?.handle || '',// ponemos opcional por que si no solo manda undefined y no renderisa
       password: '',
       password_confirmation:''
    }

    const { register, reset,  watch, handleSubmit, formState: {errors } } = useForm({defaultValues : initalValues})// extrae las funciones dentro del useForm
    
    const password = watch('password');// mira el valor de pasword

    const handleregister = async (formData : RegisterForm) => {
        try {
            const {data} = await api.post(`/auth/register`,formData)
            toast.success(data)
            reset()
            navigate('/auth/login')// te lleva al login ya que te registraste para iniciar sesion
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                toast.error(error.response.data.error)    
            }
            
        }
    }
    
        return (
            <>
                <div>
                    <h1 className=" text-center text-4xl text-white font-bold" >Crear Cuenta</h1>
                </div>
                <div className="grid grid-cols-1 space-x-3 ">
                <form
                    onSubmit={handleSubmit(handleregister)}
                    className=" bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
                >
                    <div className="grid grid-cols-1  space-y-3">
                        <label htmlFor="name" className="text-2xl text-slate-500">Nombre</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Tu Nombre"
                            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                            {...register("name", {
                                required: "El nombre es obligatorio"
                            })}
                        />
                        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>} 
                        {/* trying to fix the issue with this error.name.message */}

                    </div>
                    <div className="grid grid-cols-1 space-y-3">
                        <label htmlFor="email" className="text-2xl text-slate-500">E-mail</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email de Registro"
                            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                            {...register("email", {
                                required: "El email es obligatorio",
                                pattern: {
                                    value:/\S+@\S+\.\S+/,
                                    message: "E-mail no valido"
                                },
                            })}
                        />
                        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>} 

                    </div>
                    <div className="grid grid-cols-1 space-y-3">
                        <label htmlFor="handle" className="text-2xl text-slate-500">Handle</label>
                        <input
                            id="handle"
                            type="text"
                            placeholder="Nombre de usuario: sin espacios"
                            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                            {...register("handle", {
                                required: "El handle es obligatorio"
                            })}
                        />
                          {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>} 

                    </div>
                    <div className="grid grid-cols-1 space-y-3">
                        <label htmlFor="password" className="text-2xl text-slate-500">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Password de Registro"
                            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                            {...register("password", {
                                required: "El password es obligatorio",
                                minLength: {
                                    value: 8,
                                    message: "El password deve ser minimo de 8 caracteres"
                                }
                            })}
                        />
                      {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>} 

                    </div>

                    <div className="grid grid-cols-1 space-y-3">
                        <label htmlFor="password_confirmation" className="text-2xl text-slate-500">Repetir Password</label>
                        <input
                            id="password_confirmation"
                            type="password"
                            placeholder="Repetir Password"
                            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                            {...register("password_confirmation", {
                                required: "Confirmar el password es obligatorio",
                                validate: (value) => value === password || 'Los password no coinciden'
                            })}
                        />
                         {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>} 

                    </div>

                    <input
                        type="submit"
                        className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                        value='Crear Cuenta'
                    />
                </form>
                
                </div>
                <nav>
                    <Link className=" text-center text-white text-lg block " to="/auth/login">ya tienes cuenta? inicia sesion aqui</Link>
                </nav>
            </>
        )
    }

