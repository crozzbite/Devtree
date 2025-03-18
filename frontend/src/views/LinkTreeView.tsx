import { useEffect, useState } from "react";
import { social } from "../data/social";
import DevTreeInput from "../components/DevTreeInput";
import { isValidUrl } from "../utils";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../api/DevTreeAPI";
import { User, SocialNetwork } from "../types";

export default function LinkTreeView() {
  const [devTeeLinks, setDevTreeLinks] = useState(social);

  const quertyClient = useQueryClient();
  const user: User = quertyClient.getQueryData(['user'])!

  const { mutate} = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
        toast.error(error.message);
    },
    onSuccess: () =>{
        toast.success('Perfil Actualizado')
    }
  })
  
  useEffect(() => {
    const updatedData = devTeeLinks.map (item => {
        const userlink = JSON.parse(user.links).find((link: SocialNetwork) => link.name === item.name)
        if (userlink) {
            return {...item, url: userlink.url, enabled: userlink.enabled}
        }
        return item
    })
    setDevTreeLinks(updatedData)

  }, []);

  // agarraremos props y las pasaremos hacia el hijo
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedLinks = devTeeLinks.map((link) =>
      link.name === e.target.name ? { ...link, url: e.target.value } : link);
    setDevTreeLinks(updatedLinks);// guarda los datos de nuestro estado

    quertyClient.setQueryData (['user'], (oldData: User) => {
        return {...oldData, links: JSON.stringify(updatedLinks)} // el json para que los datos se guarden como string
      })
    };
  

  const handleEnableLink = (SocialNetwork: string) => {
    // cambiar el estado de enabled
    const updatedLinks = devTeeLinks.map(link => {
      if (link.name === SocialNetwork) {
        if (isValidUrl(link.url)) {
          return { ...link, enabled: !link.enabled };
        } else {
          toast.error("URL no valida");
        }
      }
      return link;
    })
    setDevTreeLinks(updatedLinks);

    quertyClient.setQueryData (['user'], (oldData: User) => {
      return {...oldData, links: JSON.stringify(updatedLinks)} // el json para que los datos se guarden como string
    })
  };
  return (
    <>
    <div className="space-y-5">
      {devTeeLinks.map((item) => (
        <DevTreeInput
          key={item.name}
          item={item}
          handleUrlChange={handleUrlChange}
          handleEnableLink={handleEnableLink}
        />
      ))}
      <button
      className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded front-bold"
      onClick={() => mutate(user)}
      >Guardar Cambios</button>
    </div>
    </>
  );
}
