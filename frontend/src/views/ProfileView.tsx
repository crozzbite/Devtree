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
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey: ['user']})
            toast.success('Imagen Actualizada') 
            // queryClient.setQueryData(['user'], (oldData : User) => {
            //     return{...oldData, image: data}
            // })  
        }
     })

     const handleImageChange = async (e : React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            await updateProfileImageMutation.mutate(e.target.files[0])
        }
      }
     const handleUserProfileForm = (formData : ProfileForm ) =>{
        // este querty client es para obtener la informacion de el usuario
        //manejar el estado de la app, para que no se tenga que hacer un fetch
        // cada vez que se quiera obtener la informacion de el usuario sirve para cachear la informacion de el usuario 
        const user = queryClient.getQueryData<User>(['user'])!
        user.description = formData.description
        user.handle = formData.handle        
        updateProfileMutation.mutate(user)//
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