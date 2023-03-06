import { LayoutComponent } from "../../components/LayoutComponents";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import { UploadComponents } from "../../components/UploadComponents";


export const Home = () => {

  const { signOut } = useContext(AuthContext);
  return (
    <LayoutComponent>
      <div className="home-container">
        <div className="home-content">
          <UploadComponents />
          {/* <h1 className="home-title">
            <span style={{ color: "#fff" }}>UpeMusic</span>
          </h1>
          <br />
          <br />
          <p style={{ color: "#f4f4f4" }} className="home-description">
            Aplicativo para criar playlists.
          </p> */}
        </div>
        <div className="container-login-form-btn">
            <button onClick={signOut} type="submit" className="login-form-btn">Deslogar</button>
          </div>
      </div>
    </LayoutComponent>
  );
};