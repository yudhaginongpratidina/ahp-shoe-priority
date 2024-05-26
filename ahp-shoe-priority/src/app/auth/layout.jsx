import Image from "next/image"

export default function AuthenticationLayout({ children }) {
    return (
        <div className="w-full min-h-screen flex justify-center items-center">
            <div className="w-full max-w-screen-sm shadow-md drop-shadow-md border">
                <Image src="/assets/bg-auth.jpg" className="w-full h-[250px] object-cover" width={1920} height={1080} priority={true} alt="" />
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    )
}