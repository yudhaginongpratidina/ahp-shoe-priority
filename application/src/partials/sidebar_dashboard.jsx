import SidebarMenuComponent from "../components/sidebar_menu_component"
import { GiConverseShoe, GiHamburgerMenu } from "react-icons/gi";

export default function SidebarDashboard({ children }) {

    // =======================================================================================
    // MASTER
    // =======================================================================================
    const items_information = [
        { id: 1, name: "Intensitas Kepentingan", path: "/" },
        { id: 2, name: "Matriks Size", path: "/" },
    ]

    // =======================================================================================
    // MAIN
    // =======================================================================================
    const items_main = [
        { id: 1, name: "Kriteria Target", path: "/" },
        { id: 2, name: "Kriteria Merk", path: "/" },
        { id: 3, name: "Kriteria Keawetan", path: "/" },
        { id: 4, name: "Kriteria Harga", path: "/" },
        { id: 5, name: "Kriteria Warna", path: "/" },
    ]


    // =======================================================================================
    // ALTERNATIVE
    // =======================================================================================
    const items_alternative = [

        { id: 1, name: "Daftar Alternative", path: "/" },
        { id: 2, name: "Matriks Nilai", path: "/" },
        { id: 3, name: "Rangking", path: "/" },
    ]


    // =======================================================================================
    // SISTEM
    // =======================================================================================
    const items_sistem = [
        { id: 1, name: "Log Out", path: "/" },
    ]

    return (
        <div className="w-full fixed z-10 h-full max-w-[250px] bg-slate-800 select-none">
            <div className=" text-white">
                <div className="w-full px-2 py-[7px] flex items-center justify-between gap-2.5 bg-orange-500">
                    <div className="flex items-center gap-2">
                        <GiConverseShoe className="text-white text-3xl" />
                        <h1 className="text-lg font-bold">SHOE PRIORITY</h1>
                    </div>
                    {children}
                </div>

                <SidebarMenuComponent title="Information" items={items_information} />
                <SidebarMenuComponent title="Main" items={items_main} />
                <SidebarMenuComponent title="Alternative" items={items_alternative} />
                <SidebarMenuComponent title="Sistem" items={items_sistem} />

            </div>
        </div>
    )
}