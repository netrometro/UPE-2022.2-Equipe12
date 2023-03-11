import { LayoutComponent } from "../../components/LayoutComponents";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import { useNavigate } from "react-router-dom";


export const Home = () => {
  const navigate = useNavigate();
  const search = () => {
    navigate("/searchUser");
  };
  const { signOut } = useContext(AuthContext);
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
          <button onClick={signOut} type="submit" className="login-form-btn">Deslogar</button>
          <button type="button" onClick={search} className="login-form-btn">Procurar usuário</button>
        </div>
      </div>
    </LayoutComponent>
  );
};