import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    text: string,
}

const Button = ( {text, type, ...props}: ButtonProps) => {
    return(
        <button {...props} type={type} 
            className="font-bold text-2xl rounded-md border border-orange-900 bg-orange-400 w-full mt-4 p-3 cursor-pointer hover:bg-orange-600 hover:text-white transition duration-300">
                {text}
        </button>
    )
}

export default Button;