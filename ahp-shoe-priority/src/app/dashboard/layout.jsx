"use client"

// =======================================================================================
// COMPONENT DAN ICONS
// =======================================================================================
import SidebarMenuComponent from "@/components/sidebar_menu_component";
import { GiConverseShoe, GiHamburgerMenu } from "react-icons/gi";
import { IoLogOut } from "react-icons/io5";

// =======================================================================================
// LIBRARY
// =======================================================================================
import { useState } from "react";
import { useRouter } from 'next/navigation'



export default function DashboardLayout({ children }) {


    const router = useRouter()
    const [showSidebar, setShowSidebar] = useState(false);


    // =======================================================================================
    // FUNGSI UNTUK MENAMPILKAN DAN MENYEMBUNYIKAN SIDEBAR
    // =======================================================================================
    const toggleSidebar = (e) => {
        e.preventDefault();
        setShowSidebar(!showSidebar);
    }

    // =======================================================================================
    // FUNGSI UNTUK LOG OUT
    // =======================================================================================
    const togleLogout = (e) => {
        e.preventDefault();
        router.push("/auth")
    }

    // =======================================================================================
    // MENU SIDE BAR (ASIDE)
    // =======================================================================================
    const menu_master = [
        { id: 1, name: "Intensitas Kepentingan", path: "/" },
        { id: 2, name: "Matriks Size", path: "/" },
    ]
    
    const menu_kriteria = [
        { id: 1, name: "Kriteria Target", path: "/" },
        { id: 2, name: "Kriteria Merk", path: "/" },
        { id: 3, name: "Kriteria Keawetan", path: "/" },
        { id: 4, name: "Kriteria Harga", path: "/" },
        { id: 5, name: "Kriteria Warna", path: "/" },
    ]

    const menu_alternative = [
    
        { id: 1, name: "Daftar Alternative", path: "/" },
        { id: 2, name: "Matriks Nilai", path: "/" },
        { id: 3, name: "Rangking", path: "/" },
    ]
    
    const menu_sistem = [
        { id: 1, name: "Log Out", path: "/" },
    ]

    return (
        <div className="w-full min-h-screen flex bg-white">
            {/* ============================================================================= */}
            {/* NAVBAR DASHBOARD */}
            {/* ============================================================================= */}
            <nav className="w-full  fixed top-0 py-2.5 bg-blue-500 select-none">
                <div className="px-5 flex justify-between items-center">

                    {/* ========================================================================*/}
                    {/* TOMBOL MENU SIDE BAR                                                    */}
                    {/* ========================================================================*/}
                    <div className="flex items-center">
                        <button onClick={toggleSidebar}>
                            <GiHamburgerMenu className="text-white text-2xl" />
                        </button>
                    </div>

                    {/* ==========================================================================
                        LOG OUT
                     ========================================================================== */}
                    <div className="flex items-center justify-end">
                        <button onClick={togleLogout} className="px-2.5 py-0.5 border-2 bg-orange-500">
                            <IoLogOut className="text-xl text-white" />
                        </button>
                    </div>
                </div>
            </nav>


            {/* ============================================================================= */}
            {/* SIDEBAR DASHBOARD */}
            {/* ============================================================================= */}
            <div className={`${showSidebar ? "block" : "hidden"}  w-full fixed z-10 h-full max-w-[250px] bg-slate-800 select-none`}>
                <div className=" text-white">
                    <div className="w-full px-2 py-[7px] flex items-center justify-between gap-2.5 bg-orange-500">
                        <div className="flex items-center gap-2">
                            <GiConverseShoe className="text-white text-3xl" />
                            <h1 className="text-lg font-bold">SHOE PRIORITY</h1>
                        </div>
                        <button onClick={toggleSidebar}>
                            <GiHamburgerMenu className="text-white text-2xl" />
                        </button>
                    </div>

                    <SidebarMenuComponent title="Master" items={menu_master} />
                    <SidebarMenuComponent title="Kriteria" items={menu_kriteria} />
                    <SidebarMenuComponent title="Alternative" items={menu_alternative} />
                    <SidebarMenuComponent title="Sistem" items={menu_sistem} />
                </div>
            </div>


            {/* ============================================================================= */}
            {/* MAIN */}
            {/* ============================================================================= */}
            <div className="w-full">
                <div className="w-full h-[54px]"></div>
                <div className={`px-5 ${showSidebar ? "ml-64" : "ml-0"}`}>
                    {children}
                </div>
            </div>


            {/* ============================================================================= */}
            {/* FOOTER DASHBOARD */}
            {/* ============================================================================= */}
            <footer className="w-full fixed bottom-0 py-2.5 bg-blue-500 select-none">
                <div className="container flex justify-between items-center">
                    <div className="flex items-center">
                        <h1 className="text-md text-white">AHP SHOE PRIORITY</h1>
                    </div>
                    <div className="flex items-center gap-5">
                        <h1 className="text-md text-white">Version 1.0.0</h1>
                    </div>
                </div>
            </footer>
        </div>
    )
}