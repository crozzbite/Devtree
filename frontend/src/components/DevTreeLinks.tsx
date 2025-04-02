import { useSortable } from '@dnd-kit/sortable'
import { CSS } from "@dnd-kit/utilities";
import { SocialNetwork } from "../types";

type DevTreeLinksProps = {
  link: SocialNetwork;
};

export default function DevTreeLinks({ link }: DevTreeLinksProps) {
  const { attributes, listeners, setNodeRef, transform, transition} = useSortable({
    id: link.id
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
   }
  return (
    <>
      <li className="bg-white px-5 py-2 rounded-lg flex items-center gap-5"
      ref = {setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      >
        <div className="w-12 h-12 bg-cover">
          <img
            src={`/Materiales DevTree/social/icon_${link.name}.svg`}
            alt={`${link.name}`}
          />
        </div>
        <p className="capitalize"> <span className="font-black" > Visita mi {link.name}</span></p>
      </li>
    </>
  );
}
