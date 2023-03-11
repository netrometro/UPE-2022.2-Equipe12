import { useState } from "react";
import { LayoutComponent } from "../../components/LayoutComponents";

import api from "../../services/api";


const SearchResult = ({ username, userId,currentUserId  }) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('@Auth:token')}`;
  const handleFollowUser = async () => {
    try {
      const response = await api.post('/followUser', {followerId: currentUserId , followingId:userId})
      alert('Você está seguindo este usuário');
    }
   catch (error) {
    alert("Você já segue o usuário!", error);
  }
}
  return (
    <div>
      <p>{username}</p>
      <button type="button" className="login-form-btn" onClick={handleFollowUser}>Seguir</button>
    </div>
  );
};


export const SearchUser = (currentUserId ) => {
  const [username, setUsername] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [userId, setUserId] = useState(null); // Adiciona uma nova propriedade de estado para armazenar o ID do usuário

  
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
          <button type="button" onClick={handleSubmit} className="login-form-btn">Buscar</button>
        </div>
        {searchResult && <SearchResult username={searchResult} userId={userId} />}
      </form>
    </LayoutComponent>
  );
};
