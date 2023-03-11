import { useState } from "react";
import { LayoutComponent } from "../../components/LayoutComponents";

import api from "../../services/api";


const SearchResult = ({ username }) => {
  return (
    <div>
      <p>{username}</p>
    </div>
  );
};


export const SearchUser = () => {
  const [username, setUsername] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [userId, setUserId] = useState(null);
  const logadoId = JSON.parse(localStorage.getItem('@Auth:user')).id

  const handleFollow = async (event) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('@Auth:token')}`;
    if(logadoId === userId){
      alert("Você não pode se seguir, carente!")
    }else{
      try {
        if(logadoId === userId){
        }
        await api.post('/followUser', { followerId: logadoId, followingId: userId })
        alert("Você está seguindo esse usuário agora!")
      } catch (error) {
        alert("Você já segue esse usuário!", error)
      }
    }
  }

  const handleUnfollow = async (event) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('@Auth:token')}`;
    try {
      await api.delete('/unfollowUser', { data: { followerId: logadoId, followingId: userId } });
      alert('Você deixou de seguir este usuário com sucesso!');
    } catch (error) {
      alert('Erro ao deixar de seguir o usuário:', error);
    }
  };

  const handleSubmit = async (event) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('@Auth:token')}`;
    event.preventDefault();
    try {
      const response = await api.get('/findUser', { params: { username } });
      setSearchResult(response.data.user.username);
      setUserId(response.data.user.id); // Define o ID do usuário pesquisado


    } catch (error) {
      alert('Não existe nenhum usuário com esse nome')
    }
  };

  return (
    <LayoutComponent>
      <form className="login-form">
        <span className="login-form-title" style={{ paddingBottom: "80px" }}> Buscar usuários</span>
        <div className="wrap-input">
          <input
            className={username !== "" ? "has-val input" : "input"}
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <span className="focus-input" data-placeholder="Nome do usuário"></span>
        </div> 

        <div className="container-login-form-btn">
          <button type="button" onClick={handleUnfollow} className="login-form-btn">Parar de seguir</button>

          <button type="button" onClick={handleSubmit} className="login-form-btn">Buscar</button>
          <button type="button" onClick={handleFollow} className="login-form-btn">Seguir</button>
        </div>
        {searchResult && <SearchResult username={searchResult} />}
      </form>
    </LayoutComponent>
  );
};
