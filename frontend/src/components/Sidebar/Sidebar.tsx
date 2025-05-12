import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth";
import { FaHistory } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { IoStar } from "react-icons/io5";
import { MdHome } from "react-icons/md";
import { useState } from "react";

const Sidebar = () => {
    const isActive = (path: string) => useLocation().pathname === path;

    const [ isClicked, setIsClicked ] = useState(() => {
        const stored = localStorage.getItem("sidebar");
        return stored ? JSON.parse(stored) : false;
    })

    const toggleSidebar = () => {
        const newState = !isClicked;
        setIsClicked(newState);
        localStorage.setItem("sidebar", JSON.stringify(newState));
      };

    const { logout } = useAuth()

    const items = [
        { label: 'Home', path: '/home', icon: <MdHome  size={22} />},
        { label: 'Histórico', path: '/home/history', icon: <FaHistory size={20} />},
        { label: 'Favoritos', path: '/home/favorites', icon: <IoStar size={20} />}
    ]

    return(
        <aside className={`h-screen rounded-md flex flex-col bg-orange-200 text-black shadow-zinc-900 transition-all duration-300
                        ${isClicked ? 'w-16' : 'w-[22%]'}`}>

            <div className="flex items-center justify-between p-4">
                {!isClicked && <h2 className="text-sm font-bold sm:text-xl"> Bem-vindo </h2>}

                <button onClick={toggleSidebar} className="text-black focus:outline-none cursor-pointer">
                    <IoMdMenu size={30} />
                </button>
            </div>

            <nav className="flex-1 px-2 py-4">
                {items.map((item) => (
                    <Link 
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-4 px-3 py-2 rounded-2xl mb-2 transition-all 
                            ${isActive(item.path) ? 'bg-orange-500 text-black font-semibold' : 'text-black hover:bg-orange-100'}`}
                    > 

                        <span>{item.icon}</span>
                        {!isClicked && <span className="truncate">{item.label}</span>}

                    </Link>
                ))}

            </nav>

            <div className="flex px-2 py-4">
                <button onClick={logout} className="flex items-center gap-4 px-3 py-2 font-semibold rounded-2xl text-red-600 hover:bg-red-400 w-full cursor-pointer">
                    
                    <MdLogout size={22} />
                    {!isClicked && <span className="truncate">Sair</span>}

                </button>
            </div>
        </aside>
    )
}

export default Sidebar