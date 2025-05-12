import { Link } from "react-router-dom";
import Button from "../../components/Auth/Button/Button";
import Input from "../../components/Auth/Input/Input";
import { useAuth } from "../../hooks/useAuth";
import React, { useState } from "react";

const Register = () => {
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ error, setError ] = useState("");

    const { handleRegister } = useAuth()

    const submitRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await handleRegister({ name, email, password, confirmPassword})

        } catch (error: any) {
            setError(error?.response?.data?.error || 'Erro ao registrar')
        }
    }

    return(
        <div className="min-h-screen flex items-center justify-center"> 
            <div className="p-8 shadow-2xl bg-orange-50 rounded-md w-[33rem] h-[33Srem] m-3 flex flex-col justify-between">
                <h1 className="text-4xl font-bold text-center mb-6">Registro</h1>

                {error && ( <div className="text-red-600 font-medium text-center pb-2"> {error} </div> )}

                <form onSubmit={submitRegister} className="space-y-5">
                    <div>
                    <Input 
                        type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    </div>

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

                    <div>
                    <Input 
                        type="password"
                        placeholder="Confirmar senha"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    </div>

                    <Button text="Registrar" />

                    <div className="flex justify-center text-md">
                        <p> Já tem uma conta? <Link to="/login" className="cursor-pointer text-blue-500 underline font-medium"> Entrar aqui </Link> </p>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Register;