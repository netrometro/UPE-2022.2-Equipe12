import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma"
require('dotenv').config()

// função de login utilizando webtoken
export const authenticate = async (req,res) => {
    try{
        const {email,password} = req.body

        const user = await prisma.user.findUnique({where:{email}})

        if(!user){
            return res.json('User not found')
        }

        const verifyPassword = await bcrypt.compare(password,user.password)

        if(!verifyPassword){
            return res.json('Invalid Password')
        }

        const token = jwt.sign({id:user.id}, process.env.secret, {expiresIn:"1d"})
        const {id} = user;
        return res.json({user:{id,email},token})


    }catch(e){
    }
}