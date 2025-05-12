import Button from "../../components/Auth/Button/Button";
import Input from "../../components/Auth/Input/Input";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import React, { useState } from "react";

const Login = () => {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ error, setError ] = useState("")

    const { handleLogin } = useAuth()

    const submitLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await handleLogin({ email, password })
        } catch (error: any) {
            setError(error.response?.data?.message || 'Erro ao entrar')
        }
    }

    return(
        <div className="min-h-screen flex items-center justify-center"> 
            <div className="p-8 shadow-2xl bg-orange-50 rounded-md w-[33rem] h-[30rem] m-3 flex flex-col justify-around">
                <h1 className="text-4xl font-bold text-center mb-2">Login</h1>

                {error && ( <div className="text-red-600 font-medium text-center py-2"> {error} </div> )}

                <form onSubmit={submitLogin} className="space-y-8">
                    <div>
                    <Input 
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    </div>

                    <div>
                    <Input 
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    </div>

                    <Button text="Entrar" />

                    <div className="flex justify-center text-md">
                        <p> Não tem conta ainda? <Link to="/register" className="cursor-pointer text-blue-500 underline font-medium"> Registrar aqui </Link> </p>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login;