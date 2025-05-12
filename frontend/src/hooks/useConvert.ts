import { api } from "../config/AxiosConfig"

export function useConvert(){
    const handleConvert = async ({ cryptoName, amount }: { cryptoName: string, amount: number }) => {
        const response = await api.post('/conversion', { cryptoName, amount })
        return response.data.data
    }

    return { handleConvert }
}