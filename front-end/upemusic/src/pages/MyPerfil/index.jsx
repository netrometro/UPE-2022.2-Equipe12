import { LayoutComponent } from "../../components/LayoutComponents";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";



import api from "../../services/api";


export const MyPerfil = () => {

    function handleSignOut() {
        signOut();
        navigate("/");
    }
    const navigate = useNavigate();

    const { id } = useParams();
    const [username, setUsername] = useState("");
    const [favorite_artist, setFavorite_artist] = useState("");
    const [favorite_music, setFavorite_music] = useState("");
    const [favorite_genre, setFavorite_genre] = useState("");
    const [description, setDescription] = useState("");
    const { signOut } = useContext(AuthContext);


    useEffect(() => {
        const fetchUser = async () => {
            try {
                api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('@Auth:token')}`;

                const response = await api.get(`/infoUser/${id}`);
                const userData = response.data;

                setUsername(userData.username);
                setFavorite_artist(userData.favorite_artist);
                setFavorite_music(userData.favorite_music);
                setFavorite_genre(userData.favorite_genre);
                setDescription(userData.description);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUser();
    }, [id]);

    const deleteUser = async () => {
        const userId = id;
        console.log(userId)
        api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('@Auth:token')}`;

        try {
            const response = await api.delete(`/deleteUser/${userId}`)
            handleSignOut();
        } catch (error) {
            return null;
        }
    }
    const update = async (e) => {
        api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('@Auth:token')}`;

        e.preventDefault();
        const userId = id;
        const data = {
            username,
            favorite_artist,
            favorite_music,
            favorite_genre,
            description,
        };
        try {
            const response = await api.put(`/myperfilUser/${userId}`, data);
            alert("Informações do usuário atualizadas com sucesso!")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <LayoutComponent>
            <form onSubmit={update} className="login-form">
                <div className="wrap-input">
                    <input
                        className={username !== "" ? "has-val input" : "input"}
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <span className="focus-input" data-placeholder="Username"></span>
                </div>

                <div className="wrap-input">
                    <input
                        className={favorite_artist !== "" ? "has-val input" : "input"}
                        type="text"
                        value={favorite_artist}
                        onChange={(e) => setFavorite_artist(e.target.value)}
                    />
                    <span className="focus-input" data-placeholder="Artista favorito"></span>
                </div>

                <div className="wrap-input">
                    <input
                        className={favorite_music !== "" ? "has-val input" : "input"}
                        type="text"
                        value={favorite_music}
                        onChange={(e) => setFavorite_music(e.target.value)}
                    />
                    <span className="focus-input" data-placeholder="Música favorita"></span>
                </div>

                <div className="wrap-input">
                    <input
                        className={favorite_genre !== "" ? "has-val input" : "input"}
                        type="text"
                        value={favorite_genre}
                        onChange={(e) => setFavorite_genre(e.target.value)}
                    />
                    <span className="focus-input" data-placeholder="Genêro Favorito"></span>
                </div>

                <div className="wrap-input">
                    <input
                        className={description !== "" ? "has-val input" : "input"}
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <span className="focus-input" data-placeholder="Biografia"></span>
                </div>


                <div className="container-login-form-btn">
                    <button type="submit" className="login-form-btn">Atualizar dados</button>
                </div>
                <div className="container-login-form-btn">
                    <button type="button" onClick={deleteUser} className="login-form-btn">Deletar conta</button>
                </div>
            </form>
        </LayoutComponent>
    );
};