export default function AuthLayout({ children }) {
    return (
        <div className="w-full min-h-screen flex justify-center items-center">
            <div className="w-full max-w-screen-sm shadow-md drop-shadow-md border">
                <div className="w-full h-[250px] bg-blue-400"></div>
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    )
}