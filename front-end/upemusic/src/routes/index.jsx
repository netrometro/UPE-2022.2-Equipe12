import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Login } from "../pages/Login"
import { Register } from "../pages/Register"
import { PrivateRoute } from "./privateRoutes"
import { Home } from "../pages/Home"
import {SearchUser} from "../pages/SearchUser"


export const AppRouter = () =>{
    return (
        <Router>
            <Routes>
                <Route path="/"  element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/home" element={<PrivateRoute/>}>
                    <Route path="/home" element={<Home/>}/>
                </Route>
                <Route path="/searchUser" element={<SearchUser/>}/>
            </Routes>
        </Router>

    )
}