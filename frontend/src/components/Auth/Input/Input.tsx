import React from "react";

interface InputProps {
    type: string,
    placeholder: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = ({ type, placeholder, value, onChange}: InputProps) => {
    return(
        <input 
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required
            className="border border-orange-900 rounded-md py-2 px-2 w-full placeholder:text-md placeholder:text-gray-500 outline-0"
        />
    )
}

export default Input