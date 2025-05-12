import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import RequireAuth from "./components/Auth/Require/RequireAuth";
import Register from "./pages/Register/RegisterPage"
import Favorite from "./pages/Home/FavoritePage";
import NotFound from "./pages/NotFound/NotFound"
import History from "./pages/Home/HistoryPage";
import Convert from "./pages/Home/Convert";
import Login from "./pages/Login/LoginPage"
import Home from "./pages/Home/HomePage";

function App() {
  const token = localStorage.getItem("token");

  return(
    <BrowserRouter>
      <Routes>
        {/* Routes - Auth */}
        <Route path="/" element={token ? <Navigate to="/home" /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Routes - Home */}
        <Route path="/home" element={<RequireAuth> <Home /> </RequireAuth>}>
          <Route path="" element={<Convert />} />
          <Route path="history" element={<History />} />
          <Route path="favorites" element={<Favorite />} />
        </Route>

        {/* Routes - Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
