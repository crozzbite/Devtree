import { useForm } from "react-hook-form"
import ErrorMessage from "../components/ErrorMessage"
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ProfileForm, User } from "../types";
import { updateProfile, uploadImage } from "../api/DevTreeAPI";
import { toast } from "sonner";




export default function ProfileView() {

    const queryClient = useQueryClient()
    const data: User = queryClient.getQueryData(['user'])! 
    // el signo ! al final sifnifica quiere decir que garantisamos que estara ahy User

  
     const {register, handleSubmit, formState: {errors}} = useForm<ProfileForm>({
        defaultValues: { //este es como un constructor 
        handle : data.handle,
        description: data.description
     }})

     const updateProfileMutation = useMutation({
        mutationFn: updateProfile,
        onError: (error) =>{
            toast.error(error.message)
        },
        onSuccess : (data) =>{
            toast.success(data)   
            //este queryClient.invalidateQueries es para actualizar el estado de la app y asi actualizar la informacion que ya no esta actualizada
            queryClient.invalidateQueries({queryKey: ['user']})
        }
     })

     const updateProfileImageMutation = useMutation({
        mutationFn: uploadImage,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess : (data) => {
            toast.success(data)   

        }
     })

     const handleImageChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            updateProfileImageMutation.mutate(e.target.files[0])
        }
      }
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
                    onChange={handleImageChange}
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