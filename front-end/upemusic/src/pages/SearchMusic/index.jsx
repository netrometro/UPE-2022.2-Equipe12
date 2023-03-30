import { useEffect, useState } from "react";
import { LayoutComponent } from "../../components/LayoutComponents";
import { PlayerMusic } from "../../components/PlayerMusic";
import api from "../../services/api";


export const SearchMusic = () => {
  const [data, setData] = useState([]);
  const [url, setUrl] = useState([]);


  const getMusics = async () => {
    // const headers = { //para quando o usuário estiver logado
    //   'headers'
    // }
    await api.get("/list-music")
    .then((response) => {
      console.log(response.data);
      setData(response.data.music);
      setUrl(response.data.url);
    }).catch((err) => {
      console.log(err.response)
    })
  }
  useEffect(() => {
    getMusics();
  }, []);


  return (
      <LayoutComponent>
        <PlayerMusic />
          {/* <div className="home-container">
              <div className="home-content">
                  <h1 className="home-title">
                      <span style={{ color: "#fff" }}>Suas Músicas</span>
                  </h1>
                  <br />
                  <br />
              </div>
              <div className="container-login-form-btn">
                {data.map(music => (
                  <div key={music.id}>
                    <span>{music.id}</span>
                    <br />
                    <span>{music.music}</span>
                    <br />
                  </div>
                ))}
              </div>
          </div> */}
      </LayoutComponent>
  );
};