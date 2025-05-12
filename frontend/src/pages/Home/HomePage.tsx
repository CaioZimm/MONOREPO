import Sidebar from "../../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Home = () => {

    return(
        <div className="flex w-full h-screen overflow-hidden">

            <Sidebar />

            <main className="p-4 w-full overflow-y-auto">
                <Outlet />
            </main>

        </div>
    )
}

export default Home;