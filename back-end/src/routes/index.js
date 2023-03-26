import { create, getUsers, getUser, updateUser,getInfoUser } from "../controllers/user/user-controllers"
import { authenticate } from "../controllers/auth-controller";
const authMid = require('../middlewares/auth')
import { followUser, followsUser } from "../controllers/follows/follower-controller"
import { unfollowUser } from "../controllers/follows/unfollower-controller"
import { followingsUser } from "../controllers/follows/following-controller"
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
        app.get("/infoUser/:userId", authMid, getInfoUser)
}

export default userRoutes;