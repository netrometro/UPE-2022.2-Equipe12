import { create, getUsers } from "../controllers/user-controllers";
import { authenticate } from "../controllers/auth-controller";
import uploadMid from '../middlewares/upload';
import musicController from "../controllers/music-controller";
import { importMusic } from "../repositorys/music-repository";
const authMid = require('../middlewares/auth');

const userRoutes = app => {
  app.post("/register", create);
  app.post("/authenticate", authenticate);
  app.get("/users", authMid, getUsers);
  app.get("/music/:musicId", musicController.streamMusic);
  app.get("/music/user/:userId", authMid, musicController.getMusicByUser);
  app.post("/upload", uploadMid, async (req, res) => {
    await importMusic(req.query.userId, req.file.filename, req.file.originalname, req.file.path);
    res.send("Arquivo Recebido com sucesso");
  });
};

export default userRoutes;
