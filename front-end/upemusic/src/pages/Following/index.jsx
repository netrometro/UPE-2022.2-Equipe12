import { LayoutComponent } from "../../components/LayoutComponents";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import api from "../../services/api";


export const Following = () => {
    const logadoId = JSON.parse(localStorage.getItem('@Auth:user')).id
    const [followingUsers, setFollowingUsers] = useState([]);



    const navigate = useNavigate();
    const search = () => {
        navigate("/searchUser");
    };
    const getFollowing = async (event) => {
        api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('@Auth:token')}`;
        try {
            const response = await api.get('/followingsUser', logadoId)
            setFollowingUsers(response.data.usernames)
        } catch (error) {
            alert(error)
        }
    }
    return (
        <LayoutComponent>
            <div className="home-container">
                <div className="home-content">
                    <h1 className="home-title">
                        <span style={{ color: "#fff" }}>UpeMusic</span>
                    </h1>
                    <br />
                    <br />
                </div>
                <div className="container-login-form-btn">
                    <button type="button" onClick={getFollowing} className="login-form-btn">Ver quem eu sigo</button>
                    <button type="button" onClick={search} className="login-form-btn">Procurar usuários</button>
                </div>
            </div>
        </LayoutComponent>
    );
};