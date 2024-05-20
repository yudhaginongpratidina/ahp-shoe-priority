// =========================================================================
// PARTIALS
// =========================================================================
import NavbarDashboard from "../partials/navbar_dashboard"
import FooterDashboard from "../partials/footer_dashboard"
import SidebarDashboard from "../partials/sidebar_dashboard";


// =========================================================================
// ICONS
// =========================================================================
import { GiHamburgerMenu } from "react-icons/gi";


import { useState } from "react";


export default function DashboardLayout({ children }) {

    const [showSidebar, setShowSidebar] = useState(false);

    const toggleSidebar = (e) => {
        e.preventDefault();
        setShowSidebar(!showSidebar);
    };

    return (
        <div className="w-full min-h-screen flex bg-white">
            {/* ============================================================= */}
            {/* SIDEBAR                                                       */}
            {/* ============================================================= */}
            {showSidebar && (
                <SidebarDashboard>
                    <button onClick={toggleSidebar}>
                        <GiHamburgerMenu className="text-white text-2xl" />
                    </button>
                </SidebarDashboard>
            )}


            {/* ============================================================= */}
            {/* MAIN                                                          */}
            {/* ============================================================= */}
            <div className="w-full">
                <NavbarDashboard>
                    <div className="flex items-center">
                        <button onClick={toggleSidebar}>
                            <GiHamburgerMenu className="text-white text-2xl" />
                        </button>
                    </div>
                </NavbarDashboard>
                <div className="w-full h-[54px]"></div>
                <div className={`px-5 ${showSidebar ? "ml-64" : "ml-0"}`}>
                    {children}
                </div>
                <FooterDashboard />
            </div>
        </div>
    );
}