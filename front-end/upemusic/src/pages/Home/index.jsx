import { LayoutComponent } from "../../components/LayoutComponents";

export const Home = () => {
  return (
    <LayoutComponent>
      <div className="home-container">
        <div className="home-content">
          <h1 className="home-title">
            <span style={{ color: "#fff" }}>UpeMusic</span>
          </h1>
          <br />
          <br />
          <p style={{ color: "#f4f4f4" }} className="home-description">
            Aplicativo para criar playlists.
          </p>
        </div>
      </div>
    </LayoutComponent>
  );
};