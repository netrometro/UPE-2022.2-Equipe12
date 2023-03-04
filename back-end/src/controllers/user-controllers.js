import bcrypt from "bcrypt"
import { prisma } from "../lib/prisma"

import {userValidation} from "../validators/user-validation"
import { createUser } from "../repositorys/user-repositorys";


export const create = async (req, res) => {
    try {
        await userValidation.validate(req.body);
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashPassword;
        const user = await createUser(req.body);
        
        res.status(200).send(user)

    } catch (e){
        res.status(400).send(e)

    }
}

export const getUsers = async(req,res) =>{
    const users = await prisma.user.findMany();
    return res.json({users})
}

