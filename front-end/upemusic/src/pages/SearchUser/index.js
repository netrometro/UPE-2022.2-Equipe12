import { useState } from "react";
import { LayoutComponent } from "../../components/LayoutComponents";

import api from "../../services/api";


export const SearchUser = () => {
  const [username, setUsername] = useState("");


  const handleSubmit = async (event) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('@Auth:token')}`;
    event.preventDefault();
    try {
      const response = await api.get('/findUser', { params: { username } });
      setUsername(response.data.user.username);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LayoutComponent>
      <form className="login-form">
        <span className="login-form-title" style={{paddingBottom: "80px"}}> Buscar usuários</span>
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
      </form>
    </LayoutComponent>
  );
};
