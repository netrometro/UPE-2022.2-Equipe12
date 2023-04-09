import { create, getUsers, getUser, updateUser, getInfoUser, deleteUser } from "../controllers/user/user-controllers"
import { authenticate } from "../controllers/auth-controller";
import { followUser, followsUser } from "../controllers/follows/follower-controller"
import { unfollowUser } from "../controllers/follows/unfollower-controller"
import { followingsUser } from "../controllers/follows/following-controller"
import { createPlaylist, deletePlaylist, getPlaylist } from "../controllers/playlist/playlist-controller";
const authMid = require('../middlewares/auth')
const uploadCloudinary = require('../controllers/route-upload');
const getAudio = require('../controllers/get-audio');

const userRoutes = app => {

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
    app.post("/createPlaylist", authMid, createPlaylist),
        app.get("/getPlaylist", authMid, getPlaylist),
        app.delete("/deletePlaylist", authMid,deletePlaylist)


        app.use("/audio/upload", authMid, uploadCloudinary),
        app.use("/audio/get", authMid, getAudio)

}

export default userRoutes;