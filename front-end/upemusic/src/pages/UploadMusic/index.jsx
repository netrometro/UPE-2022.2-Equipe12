import { useState } from "react";
import { LayoutComponent } from "../../components/LayoutComponents";
import api from "../../services/api";


export const Upload = () => {
    const [music, setMusic] = useState('');
    const [status, setStatus] = useState({
        type: '',
        mensagem: ''
    });

    const uploadMusic= async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('audio', music);
        api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('@Auth:token')}`;

          try {
            await api.post("/audio/upload", formData);
            alert("Upload realizado com sucesso!")
          } catch (error) {
            alert("Erro ao realizar o upload!")
          }
    }

    return (
        <LayoutComponent>
            <div className="home-container">
                <div className="home-content">
                    <h1 className="home-title">
                        <span style={{ color: "#fff" }}>Upload</span>
                    </h1>
                    <br />
                    <br />
                </div>
                <div className="container-login-form-btn">
                    <form onSubmit={uploadMusic}>
                        <label>Musica: </label>
                        <input type="file" name="music" onChange={e => setMusic(e.target.files[0])} />
                        <br />
                        <br />
                        <button type="submit" style={{ marginBottom: "10px" }} className="login-form-btn">Salvar</button>
                        <br />
                        {status.type === 'success' && <span style={{color: "green"}}>{status.mensagem}</span>}
                        {status.type === 'error' && <span style={{color: "red"}}>{status.mensagem}</span>}
                    </form>
                </div>
            </div>
        </LayoutComponent>
    );
};