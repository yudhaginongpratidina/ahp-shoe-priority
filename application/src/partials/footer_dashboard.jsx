export default function FooterDashboard(){

    return (
        <footer className="w-full fixed bottom-0 py-2.5 bg-blue-500 select-none">
            <div className="container flex justify-between items-center">
                {/* ==============================================================
                APP NAME
                ============================================================== */}
                <div className="flex items-center">
                    <h1 className="text-lg text-white">AHP SHOE PRIORITY</h1>
                </div>

                {/* ==============================================================
                MENU NAVIGATION
                ============================================================== */}
                <div className="flex items-center gap-5">
                    <h1 className="text-lg text-white">Version 1.0.0</h1>
                </div>
            </div>
        </footer>
    )
}