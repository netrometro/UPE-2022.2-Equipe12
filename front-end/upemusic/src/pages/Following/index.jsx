import { LayoutComponent } from "../../components/LayoutComponents";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import api from "../../services/api";


export const Following = () => {
    const navigate = useNavigate();
    const logadoId = JSON.parse(localStorage.getItem('@Auth:user')).id
    const [followingUsers, setFollowingUsers] = useState([]);

    function search() {
        navigate("/searchUser");
    };

    async function getFollowing() {
        api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('@Auth:token')}`;
        await api.get('/followingsUser', logadoId)
            .then(response => {
                setFollowingUsers(response.data.listaSeguindo)
            }).catch(erro => {
                console.log(erro)
            })
    }

    useEffect(() => {
        console.log(followingUsers)
    }, [followingUsers])
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
                    <button type="button" style={{ marginBottom: "10px" }} onClick={getFollowing} className="login-form-btn">Ver quem eu sigo</button>
                    <button type="button" style={{ marginBottom: "10px" }}  onClick={search} className="login-form-btn">Procurar usuários</button>
                </div>
                <span>
                    {followingUsers.map((user,index) =>(
                        <h1 key={index}>
                            {
                                user.username
                            }
                        </h1>
                    ))}
                </span>
            </div>
        </LayoutComponent>
    );
}