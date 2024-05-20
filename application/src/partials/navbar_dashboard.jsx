import { IoLogOut } from "react-icons/io5";

export default function NavbarDashboard({ children }) {
    return (
        <div className="w-full  fixed top-0 py-2.5 bg-blue-500 select-none">
            <div className="px-5 flex justify-between items-center">

                { children }

                {/* ==========================================================================
                 LOG OUT
                 ========================================================================== */}
                <div className="flex items-center justify-end">
                    <button className="px-2.5 py-0.5 border-2 bg-orange-500">
                        <IoLogOut className="text-xl text-white" />
                    </button>
                </div>

            </div>
        </div>
    )
}