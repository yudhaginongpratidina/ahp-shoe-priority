import bg_auth from "../assets/bg-auth.jpg"

export default function AuthLayout({ children }) {
    return (
        <div className="w-full min-h-screen flex justify-center items-center">
            <div className="w-full max-w-screen-sm shadow-md drop-shadow-md border">
                <img src={bg_auth} className="w-full h-[250px] object-cover" alt="" srcset="" />
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    )
}