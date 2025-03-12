import { useForm } from "react-hook-form"
import ErrorMessage from "../components/ErrorMessage"
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ProfileForm, User } from "../types";
import { updateProfile } from "../api/DevTreeAPI";




export default function ProfileView() {

    const queryClient = useQueryClient()
    const data: User = queryClient.getQueryData(['user'])! 
    // el signo ! al final sifnifica quiere decir que garantisamos que estara ahy User
    console.log(data)

  
     const {register, handleSubmit, formState: {errors}} = useForm<ProfileForm>({
        defaultValues: { //este es como un constructor 
        handle : data.handle,
        description: data.description
     }})

     const updateProfileMutation = useMutation({
        mutationFn: updateProfile,
        onError: () =>{
            console.log('hubo un error')
        },
        onSuccess : () =>{
            console.log('todo bn')
        }
     })

     const handleUserProfileForm = (formData : ProfileForm ) =>{
        updateProfileMutation.mutate(formData)
     }

     
    return (
        <form 
            className="bg-white p-10 rounded-lg space-y-5"
            onSubmit={handleSubmit(handleUserProfileForm)}
        >
            <legend className="text-2xl text-slate-800 text-center">Editar Información</legend>
            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="handle"
                >Handle:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="handle o Nombre de Usuario"
                    {...register('handle', {
                        required: 'El Nombre de usuario es obligatorio'
                    })}
                />
                {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="description"
                >Descripción:</label>
                <textarea
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="Tu Descripción"
                    {...register('description', {
                        required: 'la descripcion de usuario es obligatoria'
                    })}
                />
                {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}

            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="image"
                >Imagen:</label>
                <input
                    id="image"
                    type="file"
                    name="image"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    accept="image/*"
                    onChange={ () => {} }
                />
            </div>

            <input
                type="submit"
                className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                value='Guardar Cambios'
            />
        </form>
    )
}