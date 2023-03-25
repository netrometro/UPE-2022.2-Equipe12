import {create, getUsers,getUser,followUser, followsUser,unfollowUser,followingsUser} from "../controllers/user-controllers"
import { authenticate } from "../controllers/auth-controller";
const authMid = require('../middlewares/auth')
const uploadMusic = require('../middlewares/uploadMusic')
var cors = require('cors');

// const db = require('../models/db');

const Music = require('../models/Musics');

const userRoutes = app => {
    app.post("/register", create),
    app.post("/authenticate", authenticate),
    app.get("/users", authMid,getUsers),
    app.get("/findUser", authMid,getUser),
    app.post("/followUser",authMid,followUser),
    app.get("/followsUser",authMid,followsUser),
    app.delete("/unfollowUser",authMid,unfollowUser),
    app.get("/followingsUser",authMid,followingsUser)
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
        res.header("Access-Control-Allow-Headers", "X-PINGOTHER , Content-Type, Authorization");
        app.use(cors());
        next();
    })
    app.post("/upload-music", uploadMusic.single('music'), async (req, res) => {
        if (req.file){
            console.log("teste: ", req.file)
            try {
                const music = await Music.findAll()
                await Music.create({music: req.file.filename})
                console.log("Upload realizado com sucesso!")
            } catch (error) {
                console.log("Erro: Upload não realizado com sucesso!")
            }
            // .then(() => {
            //     return res.json({
            //         erro: false,
            //         mensagem: "Upload realizado com sucesso!"
            //     });
            // }).catch(() => {
            //     return res.status(400).json({
            //         erro: true,
            //         mensagem: "Erro: Upload não realizado com sucesso!"
            //     });
            // });
        }else{
            return res.status(400).json({
                erro: true,
                mensagem: "Erro no upload! Necessário enviar uma música mpeg, ou mp4"
            });
        }
    });

}

export default userRoutes;