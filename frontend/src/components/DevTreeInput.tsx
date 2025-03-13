import { DevTreeLink } from "../types"

type DevTreeInputProps = {
    item: DevTreeLink
}
export default function DevTreeInput({item}: DevTreeInputProps) {
    console.log(item)
    return(
        <div className="bg-white shadow-sm p-5 flex items-center gap-3">
            <div
                className="w-12 h-12 bg-cover" 
                >
                <img src={`../../public/Materiales DevTree/social/icon_${item.name}.svg`} alt={`${item.name}`} /></div>
                <input type="text" 
                className="flex-1 border border-gray-500 rounded-lg"/>
            
        </div>
    )
}