import { LayoutComponent } from "../../components/LayoutComponents";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import api from "../../services/api";


export const PerfilUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [followersUsers, setFollowersUsers] = useState([]);


  function search() {
    navigate("/searchUser");
  };


  async function getFollowers() {
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('@Auth:token')}`;
    await api.get(`/followsUser?followerId=${id}`)
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
          <button type="button" style={{ marginBottom: "10px" }} onClick={search} className="login-form-btn">Procurar usuário</button>
          <button type="button" style={{ marginBottom: "10px" }} onClick={getFollowers} className="login-form-btn">Buscar seguidores</button>
        </div>
        <span>
          {followersUsers.map((user, index) => (
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