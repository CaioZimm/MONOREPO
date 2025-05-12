import { useNavigate } from "react-router-dom";
import { api } from "../config/AxiosConfig";

export function useAuth(){
    const navigate = useNavigate()

    const handleLogin = async({ email, password}: { email: string; password: string }) => {
        const res = await api.post('/auth/login', { email, password })
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('user', JSON.stringify(res.data.data));
        navigate('/home')
    }

    const handleRegister = async({ name, email, password, confirmPassword }: { name: string; email: string; password: string; confirmPassword: string}) => {
        const res = await api.post('/auth/register', { name, email, password, confirmPassword })
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('user', JSON.stringify(res.data.data));
        navigate('/home')
    }

    const logout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return { handleLogin, handleRegister, logout}
}