// ============================================================================
// PARAMETER SELECT COMPONENT
// ----------------------------------------------------------------------------
// - id         = string
// - name       = string
// - items      = array
// ============================================================================


// ============================================================================
// CONTOH PENULISAN TEXT FIELD COMPONENT
// ----------------------------------------------------------------------------
// const percobaan_items = [
//     { id: 1, name: "Brand 1"},
//     { id: 2, name: "Brand 2"},
//     { id: 3, name: "Brand 3"},
// ]
// 
// <SelectComponent id ="brand" name = "brand" items = {percobaan_items}/>
// ============================================================================


{/* ============================================================================= */}
{/* ICONS */}
{/* ============================================================================= */}
import { FaListUl } from "react-icons/fa6";


export default function SelectComponent(props) {
    
    const { id, name, items } = props

    return (
        <div className="relative flex flex-col gap-2 mb-5">
            {/* ============================================================================= */}
            {/* LABEL */}
            {/* ============================================================================= */}
            <label htmlFor={id} className="text-md text-gray-500 capitalize">{name}</label>

            {/* ============================================================================= */}
            {/* INPUT TYPE SELECT */}
            {/* ============================================================================= */}
            <div className="flex border-2">
                <div className="flex items-center justify-center py-2 px-2.5 bg-blue-500"><FaListUl className=" text-white" /></div>
                <select 
                    id={id}
                    name={name}
                    autoComplete="off"
                    placeholder=""
                    className="w-full border-none p-2 outline-none"
                >
                    <option value="" className="">--- Select ---</option>
                    {items?.map(item => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}