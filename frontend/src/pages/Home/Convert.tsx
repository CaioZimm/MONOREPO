import Dropdown from "../../components/Home/Dropdown/Dropdown"
import { useConvert } from "../../hooks/useConvert"
import React, { useState } from "react"

const Convert = () => {
    const [crypto, setCrypto] = useState("")
    const [amount, setAmount] = useState("")
    const [result, setResult] = useState<{ brl: number; usd: number} | null>(null)
    const [error, setError] = useState("")

    const { handleConvert } = useConvert()

    const submitConvert = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!crypto || !amount || parseFloat(amount) <= 0) {
            setError("Preencha uma criptomoeda e uma quantidade válida.");
            return;
        }

        try {
            const res = await handleConvert({ cryptoName: crypto, amount: parseFloat(amount) })

            if (!res) {
                setError("Não foi possível obter os dados da conversão.");
                return;
            }

            setResult(res)
            setError("")

        } catch (error: any) {
            setError(error?.response?.data?.error || "Erro ao converter")
        }
    }

    return(
        <div className="flex justify-center items-center min-h-[80vh] flex-col">
            <div className="w-full max-w-md py-8">
                <h1 className="text-3xl font-bold text-center mb-6"> Conversor de criptomoedas </h1>
            </div>

            <form onSubmit={submitConvert} className="space-y-4 w-full max-w-md">
                <div>
                    <label className="block font-medium mb-1">Quantidade</label>
                    <input 
                        type="number"
                        placeholder="Digite a quantidade"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        min={0}
                        className="w-full p-2 border-b outline-0 focus:ring-gray-500 "
                    />
                </div>
            

                <div>
                    <label className="block mb-2 text-black font-medium">Criptomoeda</label>
                    <Dropdown selected={crypto} setSelected={setCrypto} />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-orange-500 hover:bg-orange-700 text-white font-semibold rounded-md transition cursor-pointer">
                    Converter
                </button>
            </form>

            {error && <p className="text-red-600 mt-4">{error}</p>}

            {result && (
                <div className="mt-6 w-full max-w-md p-4 border border-orange-300 rounded-md bg-orange-100 shadow-md">
                    <h2 className="text-lg font-semibold mb-2 text-orange-600">Resultado da Conversão</h2>

                    <div className="flex justify-between items-center py-1 border-b">
                    <span className="font-medium">Valor em Dólares (USD):</span>
                    <span className="text-right font-semibold text-blue-700">
                        {result.usd.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD"
                        })}
                    </span>
                    </div>

                    <div className="flex justify-between items-center py-1">
                    <span className="font-medium">Valor em Reais (BRL):</span>
                    <span className="text-right font-semibold text-green-700">
                        {result.brl.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                        })}
                    </span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Convert