import { api } from "../config/AxiosConfig";

export function useHistory() {
    
    const handleHistory = async () => {
        try {
            const res = await api.get('/history');

            return res.data.data;

        } catch (error) {
            console.error('Error')
        }
    }

    return { handleHistory }
}