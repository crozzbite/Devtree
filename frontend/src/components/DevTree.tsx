import { Toaster } from "sonner";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";

import NavigationTabs from "../components/NavigationTabs";
import { Link, Outlet } from "react-router-dom";
import { SocialNetwork, User } from "../types";
import { useEffect, useState } from "react";
import DevTreeLinks from "./DevTreeLinks";
import { useQueryClient } from "@tanstack/react-query";
import Header from "./Header";

type DevTreeProps = {
  data: User;
};

export default function DevTree({ data }: DevTreeProps) {
  const [enabledLinks, setEnabledLinks] = useState<SocialNetwork[]>(
    JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled)
  );

  useEffect(() => {
    setEnabledLinks(
      JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled)
    );
  }, [data]);

  const queryClient = useQueryClient()// para que nuestra info se actualize y podamos guardar en DB

  const handleDragEnd = (e: DragEndEvent) => {
    const {active, over} = e
if (over && over.id) { // todo para re ordenar los links con el drag and drop
    const prevIndex = enabledLinks.findIndex(link => link.id === active.id)
    const newIndex = enabledLinks.findIndex(link => link.id === over.id)
    const order = arrayMove(enabledLinks, prevIndex, newIndex)
    setEnabledLinks(order)

    const disabledLinks : SocialNetwork[] = JSON.parse(data.links).filter((item : SocialNetwork) => !item.enabled)

    const links = order.concat(disabledLinks)// aqui unimos los links habilitados con los deshabilitados 

    queryClient.setQueryData(["user"], (prevData: User) => {
        return {
          ...prevData,
          links: JSON.stringify(links)// aqui lo tendre en cache 
        }
      })
}
    
  }

  return (
    <>
     <Header/>
      <div className="bg-gray-100  min-h-screen py-10">
        <main className="mx-auto max-w-5xl p-10 md:p-0">
          <NavigationTabs />

          <div className="flex justify-end">
            <Link
              className="font-bold text-right text-slate-800 text-2xl"
              to={`/${data.handle}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              Visitar Mi Perfil: {data.handle}
            </Link>
          </div>

          <div className="flex flex-col md:flex-row gap-10 mt-10">
            <div className="flex-1 ">
              <Outlet />
            </div>
            <div className="w-full md:w-96 bg-slate-800 px-5 py-10 space-y-6">
              <p className="text-4xl text-center text-white">{data.handle}</p>

              {data.image && (
                <img
                  src={data.image}
                  alt="Perfil Imagen"
                  className="mx-auto max-w[250px]"
                />
              )}
              <p className="text-center text-lg font-black text-white">
                {data.description}
              </p>

              <DndContext
              collisionDetection = {closestCenter}
              onDragEnd={handleDragEnd}
              >
              <div className="mt-20 flex flex-col gap-5">
                <SortableContext
                items ={enabledLinks}
                strategy={verticalListSortingStrategy}
                > 
                    {enabledLinks.map((link) => (
                     <DevTreeLinks key={link.name} link={link} />
                    ))}
                </SortableContext>
              </div>

              </DndContext>

            </div>
          </div>
        </main>
      </div>
      <Toaster position="top-right" />
    </>
  );
}
