import { useEffect, useState } from "react";
import { LayoutComponent } from "../../components/LayoutComponents";
import api from "../../services/api";


export const SearchPlaylist = () => {
    const [data, setData] = useState([]);


    const getPlaylist = async () => {
        api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('@Auth:token')}`;
        await api.get("/getPlaylist")
            .then((response) => {
                console.log(response.data);
                setData(response.data.data);
                // setUrl(response.data.url);
            }).catch((err) => {
                console.log(err.response)
            })
    }
    useEffect(() => {
        getPlaylist();
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
                <div className="containerAllMusics">
                    {data.map(music => (
                        <div className="box" key={music.playlistMusics}>
                            <span className="titleMusic">{music.name}</span>
                            <br />
                            <audio className="audio" src={music.secure_url} controls />
                            <br />
                        </div>
                    ))}
                </div>
            </div>
        </LayoutComponent>
    );
};