"use client"


import ButtonComponent from "@/components/button_component";
import TextFieldComponent from "@/components/textfield_component";

import { useState } from "react";

export default function Page() {

    const [formTitle, setFormTitle] = useState("Sign In")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")


    const handleUpdateFormTiitle = () => {
        if (formTitle === "Sign In") {
            setFormTitle("Sign Up")
        } else {
            setFormTitle("Sign In")
        }
    }


    const handleLogin = async (e) => {
        e.preventDefault()
    }


    const handleSignUp = async (e) => {
        e.preventDefault()
    }

    return (
        <>
            <div className="flex flex-col gap-1.5 mb-2">
                <h1 className="text-2xl capitalize font-bold">{formTitle}</h1>
                <h2 className="text-sm">Enter your username and password</h2>
            </div>

            {message &&
                <div className="flex justify-center border shadow-md bg-slate-100 p-2 mb-5">
                    <span className="text-xs">{message}</span>
                </div>
            }


            <form className="my-5" onSubmit={formTitle === "Sign In" ? handleLogin : handleSignUp}>
                <TextFieldComponent id="username" name="username" required={true} value={username} onChange={(e) => setUsername(e.target.value)} />
                <TextFieldComponent id="password" name="password" required={true} value={password} onChange={(e) => setPassword(e.target.value)} />
                <ButtonComponent type="submit" name={formTitle} btnType="auth" />
            </form>

            <div className="flex justify-center py-2">
                <button className="text-md" onClick={handleUpdateFormTiitle}>
                    {
                        formTitle === "Sign In"
                            ? "Don't have an account? Sign Up"
                            : "Already have an account? Sign In"
                    }
                </button>
            </div>
        </>
    )
}