// ============================================================================
// PARAMETER TEXT FIELD COMPONENT
// ----------------------------------------------------------------------------
// - id         = string
// - name       = string
// ============================================================================


// ============================================================================
// CONTOH PENULISAN TEXT FIELD COMPONENT
// ----------------------------------------------------------------------------
// <TextFieldComponent id="username" name="username" />
// ============================================================================


import React, { useState } from "react";


export default function TextFieldComponent(props) {

    const { id, name } = props

    const [focus, setFocus] = useState(false);

    const handleFocus = () => {
        setFocus(true);
    };

    const handleBlur = (e) => {
        if (e.target.value === "") {
            setFocus(false);
        }
    };

    return (
        <div className="relative flex flex-col gap-2 mb-5">
            <label
                htmlFor={id}
                className={`absolute transition-all left-2 duration-500 ${focus ? "-top-2.5  text-xs text-gray-600" : "top-2 capitalize text-gray-500"}`}
            >
                {name}
            </label>
            <input
                type="text"
                id={id}
                name={name}
                placeholder=""
                className="border p-2 outline-none"
                onFocus={handleFocus}
                onBlur={handleBlur}
                autoComplete="off"
            />
        </div>
    );
}
