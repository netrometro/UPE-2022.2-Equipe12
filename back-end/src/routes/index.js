import { create, getUsers, getUser, updateUser, getInfoUser, deleteUser } from "../controllers/user/user-controllers"
import { authenticate } from "../controllers/auth-controller";
import { followUser, followsUser } from "../controllers/follows/follower-controller"
import { unfollowUser } from "../controllers/follows/unfollower-controller"
import { followingsUser } from "../controllers/follows/following-controller"
import express from "express";
import path from "path";
const authMid = require('../middlewares/auth')
const uploadMusic = require('../middlewares/uploadMusic')
const uploadCloudinary = require('../controllers/route-upload');
const getAudio = require('../controllers/get-audio');
const auth = require("../middlewares/auth");
var cors = require('cors');

const Music = require('../models/Musics');

const userRoutes = app => {
    const router = express.Router();
    router.use('/files', express.static(path.resolve(__dirname, "public", "upload")));

    app.post("/register", create),
    app.post("/authenticate", authenticate),
    app.get("/users", authMid, getUsers),
    app.get("/findUser", authMid, getUser),
    app.post("/followUser", authMid, followUser),
    app.get("/followsUser", authMid, followsUser),
    app.delete("/unfollowUser", authMid, unfollowUser),
    app.get("/followingsUser", authMid, followingsUser),
    app.put("/myperfilUser/:userId", authMid, updateUser),
    app.get("/infoUser/:userId", authMid, getInfoUser),
    app.delete("/deleteUser/:userId", authMid, deleteUser)
    app.use("/audio/upload" , auth, uploadCloudinary);
    app.use("/audio/get" , getAudio);
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
        res.header("Access-Control-Allow-Headers", "X-PINGOTHER , Content-Type, Authorization");
        app.use(cors());
        next();
    })
    app.use(router);
    app.get("/list-music", async(req, res) =>{
        await Music.findAll()
        .then((music) => {
            return res.json({
                erro: false,
                music,
                url: "http://localhost:3333/files/users/"
            })
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Nenhuma música encontrada!"
            })
        })
    });
    app.post("/upload-music", uploadMusic.single('music'), async (req, res) => {
        if (req.file){
            console.log("teste: ", req.file)
            try {
                // const music = await Music.findAll()
                await Music.create({music: req.file.filename})
                return res.json({
                    erro: false,
                    mensagem: "Upload realizado com sucesso!"
                });
            } catch (error) {
                return res.status(400).json({
                    erro: true,
                    mensagem: "Erro: Upload não realizado com sucesso!"
                });
            }
        }else{
            return res.status(400).json({
                erro: true,
                mensagem: "Erro no upload! Necessário enviar uma música mpeg, ou mp4"
            });
        }
    });

}

export default userRoutes;