// ============================================================================
// PARAMETER SIDEBAR MENU COMPONENT
// ----------------------------------------------------------------------------
// - title      = string
// - items      = array
// ============================================================================


// ============================================================================
// CONTOH PENULISAN SIDEBAR MENU COMPONENT
// ----------------------------------------------------------------------------
// const items = [
//     { id: 1, name: "item 1", path: "/"},
//     { id: ..., name: "...", path: "/"},
//     ...
// ]
// 
// <SidebarMenuComponent title="Master" items={items} />
// ============================================================================


import { Link } from "react-router-dom";
import { CgMenuGridR } from "react-icons/cg";
import { FaRegCircle } from "react-icons/fa";

export default function SidebarMenuComponent(props) {

    // eslint-disable-next-line react/prop-types
    const { title, items } = props;

    // ===========================================================================
    // UNTUK CEK ISI PARAMETER ITEMS (DIREKOMENDASIKAN MENGGUNAKAN CONSOLE.TABLE)
    // ===========================================================================
    // console.log(items);
    // console.table(items);

    return (
        <>
            {/* ======================================================================= */}
            {/* NAMA MENU SIDEBAR */}
            {/* ======================================================================= */}
            <div className="px-2 py-3 bg-slate-700 flex items-center gap-2.5">
                <CgMenuGridR className="text-white text-2xl" />
                <h1 className="text-lg uppercase font-semibold">{title}</h1>
            </div>

            {/* ========================================================================= */}
            {/* ITEMS */}
            {/* ========================================================================= */}
            <div className="px-5 py-4 flex flex-col gap-2.5">
                {items.map(item => (
                    <Link to={item.path} key={item.id} className="flex items-center gap-2.5">
                        <FaRegCircle className="text-blue-500 text-md" />
                        <h1 className="text-sm">{item.name}</h1>
                    </Link>
                ))}
            </div>
        </>
    );
}
