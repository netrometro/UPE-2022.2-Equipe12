import { LayoutComponent } from "../../components/LayoutComponents";
import { useNavigate } from "react-router-dom";
import { useState} from "react";

import api from "../../services/api";


export const Follower = () => {
    const logadoId = JSON.parse(localStorage.getItem('@Auth:user')).id
    const [followersUsers, setFollowersUsers] = useState([]);
    const navigate = useNavigate();


    function search(){
        navigate("/searchUser");
    };
    async function getFollowers() {
        api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('@Auth:token')}`;
        await api.get('/followsUser',{params:{followerId:logadoId}})
            .then(response => {
                console.log(response.data.listaSeguidores.followers)
                setFollowersUsers(response.data.listaSeguidores.followers)
            }).catch(erro => {
                console.log(erro)
            })
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
                    <button type="button" style={{ marginBottom: "10px" }} onClick={getFollowers} className="login-form-btn">Buscar seguidores</button>
                    <button type="button" style={{ marginBottom: "10px" }} onClick={search} className="login-form-btn">Procurar usuários</button>
                </div>
                <span>
                    {followersUsers.map((user,index) =>(
                        <h1 key={index}>
                            {
                                user.follower.username
                            }
                        </h1>
                    ))}
                </span>
            </div>
        </LayoutComponent>
    );
};