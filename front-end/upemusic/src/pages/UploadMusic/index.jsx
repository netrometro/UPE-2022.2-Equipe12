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
        console.log("upload");

        const formData = new FormData();
        formData.append('music', music);

        const headers = {
            'headers':{
              'Content-Type': 'application/json',
              'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'
            }
          }

          await api.post("/upload-music", formData, headers)
          .then((response) => {
            setStatus({
              type: 'success',
              mensagem: response.data.mensagem
            });
          }).catch((err) => {
            if(err.response){
              setStatus({
                type: 'error',
                mensagem: err.response.data.mensagem
              });
            }else{
              setStatus({
                type: 'error',
                mensagem: "Erro: Tente mais tarde!"
              });
            }
          });
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
                        {status.type === 'success'? <p style={{color: "green"}}>{status.mensagem}</p> : ""}
                        {status.type === 'error'? <p style={{color: "red"}}>{status.mensagem}</p> : ""}
                    <form onSubmit={uploadMusic}>
                        <label>Musica: </label>
                        <input type="file" name="music" onChange={e => setMusic(e.target.files[0])} />
                        <br />
                        <br />
                        <button type="submit" style={{ marginBottom: "10px" }} className="login-form-btn">Salvar</button>
                    </form>
                </div>
            </div>
        </LayoutComponent>
    );
};