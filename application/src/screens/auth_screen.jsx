import AuthLayout from "../layouts/auth_layout"
import TextFieldComponent from "../components/textfield_component"
import ButtonComponent from "../components/button_component"

import axios from "axios"
import { useState } from "react"

export default function AuthScreen() {

    const [formTitle, setFormTitle] = useState("Sign In")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post("http://localhost:4000/signIn", {
                username: username,
                password: password
            })

            // ===========================================
            // DEBUG
            // --------------------------------------------
            // console.log(response.data)
            // console.table(response.data)
            // ===========================================

            const result = response.data
            setMessage(result.message)
        } catch (error) {
            // ===========================================
            // DEBUG
            // --------------------------------------------
            // console.log(error.response.data);
            // console.table(error.response.data);
            // ===========================================

            setMessage(error.response.data.message)
        }
    }

    const handleSignUp = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:4000/signup", {
                username: username,
                password: password
            })  

            // ===========================================
            // DEBUG
            // --------------------------------------------
            // console.table(response.data)
            // console.table(response.data)
            // ===========================================

            const result = response.data
            setMessage(result.message)
        } catch (error) {
            // ===========================================
            // DEBUG
            // --------------------------------------------
            // console.log(error.response.data);
            // console.table(error.response.data);
            // ===========================================

            setMessage(error.response.data.message)
        }
    }

    const handleUpdateFormTiitle = (e) => {
        e.preventDefault()
        if (formTitle === "Sign In") { setFormTitle("Sign Up")} 
        else { setFormTitle("Sign In")}
    }
    
    return (
        <AuthLayout>
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
                <TextFieldComponent id="username" name="username" required={true} value={username} onChange={(e) => setUsername(e.target.value)}/>
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
        </AuthLayout>
    )
}