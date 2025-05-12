import { useLocation } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center text-center">
            <h1 className="text-5xl font-bold text-red-500 mb-4">404</h1>

            <p className="text-xl font-semibold mb-2">Página não encontrada</p>
            <p className="mb-4">A URL 
                <span className="bg-gray-300 px-2 py-1 rounded">{useLocation().pathname}</span> 
                não existe 
            </p>

            <a href="/login" className="text-blue-600 underline font-medium text-xl"> Ir para página de Login </a>
        </div>
    )
}

export default NotFound;