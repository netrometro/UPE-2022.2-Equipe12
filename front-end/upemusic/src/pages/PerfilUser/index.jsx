import { LayoutComponent } from "../../components/LayoutComponents";
import { useNavigate, useParams } from "react-router-dom";
import { useState,useEffect } from "react";

import api from "../../services/api";


export const PerfilUser = () => {
  function search() {
    navigate("/searchUser");
  };

  const navigate = useNavigate();
  const { id } = useParams();
  const [followersUsers, setFollowersUsers] = useState([]);

  const [username, setUsername] = useState("");
  const [favorite_artist, setFavorite_artist] = useState("");
  const [favorite_music, setFavorite_music] = useState("");
  const [favorite_genre, setFavorite_genre] = useState("");
  const [description, setDescription] = useState("");




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

  useEffect(() => {
    const fetchUser = async () => {
        try {
            api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('@Auth:token')}`;

            const response = await api.get(`/infoUser/${id}`);
            const userData = response.data;

            setUsername(userData.username);
            setFavorite_artist(userData.favorite_artist);
            setFavorite_music(userData.favorite_music);
            setFavorite_genre(userData.favorite_genre);
            setDescription(userData.description);
        } catch (error) {
            console.log(error);
        }
    };

    fetchUser();
}, [id]);

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
        <form className="login-form">
                <div className="wrap-input">
                    <input
                        className={username !== "" ? "has-val input" : "input"}
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled
                    />
                    <span className="focus-input" data-placeholder="Username"></span>
                </div>

                <div className="wrap-input">
                    <input
                        className={favorite_artist !== "" ? "has-val input" : "input"}
                        type="text"
                        value={favorite_artist}
                        onChange={(e) => setFavorite_artist(e.target.value)}
                        disabled
                    />
                    <span className="focus-input" data-placeholder="Artista favorito"></span>
                </div>

                <div className="wrap-input">
                    <input
                        className={favorite_music !== "" ? "has-val input" : "input"}
                        type="text"
                        value={favorite_music}
                        onChange={(e) => setFavorite_music(e.target.value)}
                        disabled
                    />
                    <span className="focus-input" data-placeholder="Música favorita"></span>
                </div>

                <div className="wrap-input">
                    <input
                        className={favorite_genre !== "" ? "has-val input" : "input"}
                        type="text"
                        value={favorite_genre}
                        onChange={(e) => setFavorite_genre(e.target.value)}
                        disabled
                    />
                    <span className="focus-input" data-placeholder="Genêro Favorito"></span>
                </div>

                <div className="wrap-input">
                    <input
                        className={description !== "" ? "has-val input" : "input"}
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        disabled
                    />
                    <span className="focus-input" data-placeholder="Biografia"></span>
                </div>
            </form>
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