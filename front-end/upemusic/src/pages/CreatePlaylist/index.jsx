import { useEffect, useState } from "react";
import { LayoutComponent } from "../../components/LayoutComponents";
import api from "../../services/api";

export const CreatePlaylist = () => {
  const [data, setData] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [selectedMusics, setSelectedMusics] = useState([]);

  const getMusics = async () => {
    api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('@Auth:token')}`;
    try {
      const response = await api.get("/audio/get");
      setData(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMusics();
  }, []);

  const handleCheckboxChange = (event) => {
    const musicId = event.target.value;
    if (event.target.checked) {
      setSelectedMusics([...selectedMusics, musicId]);
    } else {
      setSelectedMusics(selectedMusics.filter((id) => id !== musicId));
    }
  };

  const handleCreatePlaylist = async () => {
    const payload = {
      name: playlistName,
      musicIds: selectedMusics,
    };
    try {
      await api.post("createPlaylist", payload);
      alert("Playlist criada com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao criar a playlist.");
    }
  };

  const handleDeletePlaylist = async () => {
    const payload = {
      name: playlistName,
    };
    try {
      await api.delete("deletePlaylist", { data: payload });
      alert("Playlist excluída com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao excluir a playlist.");
    }
  };

  return (
    <LayoutComponent>
      <div className="home-container">
        <div className="home-content">
          <br />
          <br />
          <div>
            <h2 className="home-title">
              <span className="login-form-title" style={{ paddingBottom: "80px" }}>
                Criar playlist
              </span>
              <div className="wrap-input">
                <input
                  className={playlistName !== "" ? "has-val input" : "input"}
                  type="text"
                  value={playlistName}
                  onChange={(event) => setPlaylistName(event.target.value)}
                />
                <span className="focus-input" data-placeholder="Nome da playlist"></span>
              </div>
            </h2>
          </div>
        </div>
        <div className="containerAllMusics">
          {data.map((music) => (
            <div className="box" key={music.asset_id}>
              <span className="titleMusic">{music.public_id}</span>
              <br />
              <audio className="audio" src={music.secure_url} controls />
              <br />
              <input type="checkbox" value={music.asset_id} onChange={handleCheckboxChange} />
              <label htmlFor={music.asset_id}>Selecionar</label>
            </div>
          ))}
        </div>
        <button className="login-form-btn" style={{ marginBottom: "10px" }}  onClick={handleCreatePlaylist}>
          Criar Playlist
        </button>
        <button className="login-form-btn"  style={{ marginBottom: "10px" }}  onClick={handleDeletePlaylist}>
          Deletar Playlist
        </button>
      </div>
    </LayoutComponent>
  );
};
