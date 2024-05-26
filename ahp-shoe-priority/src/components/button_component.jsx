// ============================================================================
// PARAMETER BUTTON COMPONENT
// ----------------------------------------------------------------------------
// - type       = "button" | "submit" | "reset"
// - name       = string
// - btnType    = "auth" | "create" | "edit" | "update" | "delete"
// ============================================================================


// ============================================================================
// CONTOH PENULISAN BUTTON COMPONENT
// ----------------------------------------------------------------------------
// <BtnButtonComponent type="button" name="Login" btnType="auth" />
// ============================================================================


export default function ButtonComponent(props){

    const { type, name, btnType } = props

    return (
        <button 
            type={type || "button"} 
            className={`

                ${btnType == "auth"     ? "bg-slate-500 hover:bg-slate-600 text-white": ""} 
                ${btnType == "create"   ? "bg-blue-500 hover:bg-blue-600 text-white": ""} 
                ${btnType == "edit"     ? "bg-yellow-500 hover:bg-yellow-600 text-white": ""} 
                ${btnType == "update"   ? "bg-green-500 hover:bg-green-600 text-white": ""} 
                ${btnType == "delete"   ? "bg-red-500 hover:bg-red-600 text-white": ""} 

                w-full p-2 bg-blue-500 text-white`
            }
        >{name}</button>
    )
}