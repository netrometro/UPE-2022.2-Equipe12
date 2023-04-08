import { useEffect, useState } from "react";
import { LayoutComponent } from "../../components/LayoutComponents";
import api from "../../services/api";


export const SearchMusic = () => {
  const [data, setData] = useState([]);


  const getMusics = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };
    await api.get("/audio/get", config)
    .then((response) => {
      console.log(response.data);
      setData(response.data.data);
      // setUrl(response.data.url);
    }).catch((err) => {
      console.log(err.response)
    })
  }
  useEffect(() => {
    getMusics();
  }, []);


  return (
      <LayoutComponent>
        {/* <PlayerMusic /> */}
          <div className="home-container">
              <div className="home-content">
                  <h1 className="home-title">
                      <span style={{ color: "#fff" }}>Suas Músicas</span>
                  </h1>
                  <br />
                  <br />
              </div>
              <div className="container-login-form-btn">
                {data.map(music => (
                  <div key={music.asset_id}>
                    <span>{music.public_id}</span>
                    <br />
                    <span>{music.filename}</span>
                    <audio src={music.secure_url} controls autoPlay/>
                    <br />
                  </div>
                ))}
              </div>
          </div>
      </LayoutComponent>
  );
};