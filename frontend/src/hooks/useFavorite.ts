import { api } from "../config/AxiosConfig";

export function useFavorite(){
    const getFavorite = async ( cryptoName: string) => {
        const res = await api.post('/favorites/toggle', { cryptoName })
        return res.data.data
    }

    const listFavorite = async () => {
        try {
            const res = await api.get("/favorites");
            return res.data.data
        } catch (error) {
            console.error("Erro ao buscar favoritos");
        }
    }

    return { getFavorite, listFavorite }
}