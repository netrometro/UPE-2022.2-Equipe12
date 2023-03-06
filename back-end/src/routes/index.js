import {create, getUsers} from "../controllers/user-controllers";
import { authenticate } from "../controllers/auth-controller";
import uploadMid from '../middlewares/upload';
const authMid = require('../middlewares/auth');

const userRoutes = app => {
    app.post("/register", create),
    app.post("/authenticate", authenticate),
    app.get("/users", authMid,getUsers),
    app.post("/upload", uploadMid, (req, res) => {
        res.send("Arquivo recebido!");
    })
}

export default userRoutes;