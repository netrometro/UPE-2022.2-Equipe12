import {create, getUsers,getUser,followUser, followsUser,unfollowUser,followingsUser} from "../controllers/user-controllers"
import { authenticate } from "../controllers/auth-controller";
const authMid = require('../middlewares/auth')
const uploadMusic = require('../middlewares/uploadMusic')

const userRoutes = app => {
    app.post("/register", create),
    app.post("/authenticate", authenticate),
    app.get("/users", authMid,getUsers),
    app.get("/findUser", authMid,getUser),
    app.post("/followUser",authMid,followUser),
    app.get("/followsUser",authMid,followsUser),
    app.delete("/unfollowUser",authMid,unfollowUser),
    app.get("/followingsUser",authMid,followingsUser)
    app.post("/upload-music", uploadMusic.single('music'), async (req, res) => {
        if (req.file){
            console.log(req.file);
            return res.json({
                erro: false,
                mensagem: "Upload realizado com sucesso!"
            })
        }
        return res.status(400).json({
            erro: true,
            mensagem: "Erro no upload!"
        });
    })

}

export default userRoutes;