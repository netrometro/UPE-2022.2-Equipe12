import cors from "cors";
import dotenv from "dotenv";
import express from 'express'
import routes from "./routes"
require('dotenv').config()


const app = express();

dotenv.config()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));
routes(app);

app.listen(3333);
console.log("servidor rodando")

