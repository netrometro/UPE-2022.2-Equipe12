import {create, getUsers,getUser,followUser, followsUser,unfollowUser,followingsUser} from "../controllers/user-controllers"
import { authenticate } from "../controllers/auth-controller";
const authMid = require('../middlewares/auth')

const userRoutes = app => {
    app.post("/register", create),
    app.post("/authenticate", authenticate),
    app.get("/users", authMid,getUsers),
    app.get("/findUser", authMid, getUser),
    app.post("/followUser",authMid, followUser),
    app.get("/followsUser", authMid, followsUser),
    app.delete("/unfollowUser",authMid, unfollowUser),
    app.get("/followingsUser",authMid, followingsUser)

}

export default userRoutes;