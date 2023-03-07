import {create, getUsers,getUser,followUser, followsUser,unfollowUser} from "../controllers/user-controllers"
import { authenticate } from "../controllers/auth-controller";
const authMid = require('../middlewares/auth')

const userRoutes = app => {
    app.post("/register", create),
    app.post("/authenticate", authenticate),
    app.get("/users", authMid,getUsers),
    app.get("/findUser", authMid, getUser),
    app.post("/followUser", followUser),
    app.get("/followsUser", followsUser),
    app.delete("/unfollowUser",unfollowUser)

}

export default userRoutes;