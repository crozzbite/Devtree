import { SocialNetwork, Userhandle } from "../types";

type HandleDataProps = {
  data: Userhandle;
}
export default function HandleData({data}: HandleDataProps) {
    const links: SocialNetwork[] = JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled)
  return (
    <div className=" space-y-6 text-white ">
      <div className=" rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl text-center font-bold text-gray-800 mb-4">Perfil de {data.handle}</h1>
        {data.image && (
          <img 
            src={data.image} 
            alt="Imagen de perfil" 
            className="max-w-250 max-h-250 rounded-lg object-cover mx-auto"
          />
        )}
        <br />
        <p className="text-gray-800 text-lg text-center">{data.description}</p>
        <div className="mt-20 flex flex-col gap-6">
            {links.length ? 
            links.map((link) => (
                <a className=" bg-white px-5 py-2 flex items-center gap-5 rounded-lg"
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={link.name}
                    >
                    <img className="w-12" src={`/Materiales DevTree/social/icon_${link.name}.svg`} alt="imagen red social"/>
                        <p className="text-black capitalize font-black text-lg ">Visita mi : {link.name}</p></a>
            ))
            : <p className="text-center" >No hay enlaces en este perfil</p>}
        </div>
      </div>
    </div>
  )
}
