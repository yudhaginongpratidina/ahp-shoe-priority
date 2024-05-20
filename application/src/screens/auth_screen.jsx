import AuthLayout from "../layouts/auth_layout"
import TextFieldComponent from "../components/textfield_component"
import ButtonComponent from "../components/button_component"

export default function AuthScreen() {
    return (
        <AuthLayout>
            <div className="flex flex-col gap-1.5 mb-7">
                <h1 className="text-2xl capitalize font-bold">sign in</h1>
                <h2 className="text-sm">Enter your username and password</h2>
            </div>
            <form action="">
                <TextFieldComponent id="username" name="username" />
                <TextFieldComponent id="password" name="password" />
                <ButtonComponent type="submit" name="Sign In" btnType="auth" />
            </form>
        </AuthLayout>
    )
}