import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Login } from "../pages/Login"
import { Register } from "../pages/Register"
import { PrivateRoute } from "./privateRoutes"
import { Home } from "../pages/Home"
import {SearchUser} from "../pages/SearchUser"
import { Follower } from "../pages/Follower"
import { Following } from "../pages/Following"
import {PerfilUser} from "../pages/PerfilUser"
import { MyPerfil } from "../pages/MyPerfil"
import { SearchMusic } from "../pages/SearchMusic"
import { Upload } from "../pages/UploadMusic"
import { SearchPlaylist } from "../pages/YourPlaylists"
import { CreatePlaylist } from "../pages/CreatePlaylist"

export const AppRouter = () =>{
    return (
        <Router>
            <Routes>
                <Route path="/"  element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/" element={<PrivateRoute/>}>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/searchUser" element={<SearchUser/>}/>
                    <Route path="/followerUser" element={<Follower/>}/>
                    <Route path="/followingsUser" element={<Following/>}/>
                    <Route path="/perfilUser/:id" element={<PerfilUser/>}/>
                    <Route path="/myperfilUser/:id" element={<MyPerfil/>}/>
                    <Route path="/searchMusic" element={<SearchMusic/>}/>
                    <Route path="/Upload" element={<Upload/>}/>
                    <Route path="/getPlaylist" element={<SearchPlaylist/>}/>
                    <Route path="/createPlaylist" element={<CreatePlaylist/>}/>
                </Route>
            </Routes>
        </Router>

    )
}