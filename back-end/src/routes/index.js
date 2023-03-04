import {create} from "../controllers/user-controllers"

const userRoutes = app => {
    app.post("/register", create)
}

export default userRoutes;