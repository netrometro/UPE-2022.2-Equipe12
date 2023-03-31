import { LayoutComponent } from "../../components/LayoutComponents";
import { HiOutlineMusicNote, HiOutlineSearch } from "react-icons/hi";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { Footer } from "../../components/Footer";

export const Home = () => {
  const navigate = useNavigate();
  const { signOut } = useContext(AuthContext);
  const logadoId = JSON.parse(localStorage.getItem('@Auth:user')).id


  function search() {
    navigate("/searchUser");
  };

  function follower() {
    navigate("/followerUser");
  };
  function following() {
    navigate("/followingsUser");
  };
  function UpMusic() {
    navigate("/Upload");
  };
  function SearchMusic() {
    navigate("/SearchMusic");
  };
  function handleSignOut() {
    signOut();
    navigate("/");
  }
  return (
    <><LayoutComponent>
      <div className="home-container">
        <div className="home-content">
          <h1 className="home-title">
            <span style={{ color: "#fff" }}>UpeMusic</span>
          </h1>
          <br />
          <br />
        </div>
        <div className="container-login-form-btn">
          <button type="button" style={{ marginBottom: "10px" }} onClick={UpMusic} className="login-form-btn">
            <HiOutlineMusicNote size="30px" style={{marginRight:"2%"}} />
            Upar suas músicas
          </button>
          <button type="button" style={{ marginBottom: "10px" }} onClick={SearchMusic} className="login-form-btn">
          <HiOutlineSearch size="30px" style={{marginRight:"2%"}} />
            Pesquisar suas músicas
          </button>
          <button type="button" style={{ marginBottom: "10px" }} onClick={search} className="login-form-btn">Procurar usuário</button>
          <button type="button" style={{ marginBottom: "10px" }} onClick={follower} className="login-form-btn">Seguidores</button>
          <button type="button" style={{ marginBottom: "10px" }} onClick={following} className="login-form-btn">Seguindo</button>
          <button onClick={handleSignOut} style={{ marginBottom: "10px" }} type="submit" className="login-form-btn">Deslogar</button>
          <button
            type="button"
            style={{ marginBottom: "10px" }}
            onClick={() => navigate(`/myperfilUser/${logadoId}`)}
            className="login-form-btn">
            Ir para o meu perfil
          </button>
        </div>
      </div>
    </LayoutComponent><Footer /></>

  );
};