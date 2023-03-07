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

export const getUser = async(req,res) => {
    const {username} = req.body;
    const user = await prisma.user.findUnique({where:{username}})

    if(!user){
        return res.json('User not found')
    }

    const {id} = user;
    return res.json({user:{id,username}})
    
}

export const followUser = async(req,res) =>{
    const {followerId,followingId} = req.body;
    const follow = await prisma.follows.create({
        data:{
            follower:{ connect:{id:followerId}},
            following:{connect:{id:followingId}}
        }
    })

    return res.json(follow)

}

export const unfollowUser = async (req, res) => {
    const { followerId, followingId } = req.body;
  
    const follow = await prisma.follows.findUnique({
      where: {
        followerId_followingId: { followerId, followingId },
      },
    });
  
    if (!follow) {
      return res.status(404).json({ message: "Você não segue esse usuário!" });
    }
  
    const unfollow = await prisma.follows.delete({
      where: {
        followerId_followingId: { followerId, followingId },
      },
    });
  
    return res.json(unfollow);
  };

export const followsUser = async (req, res) => {
    const { followerId } = req.body;
    const follows = await prisma.follows.findMany({ where: { followerId } })
    const seguidores = {
        followerId,
        listaSeguidores: []
    }
    await Promise.all(follows.map(async (item, index) => {
        const user = await prisma.user.findUnique({ where: { id: item.followingId }, select: { id:true, username: true } })
            .then(item => {
                console.log("User", item)
                seguidores.listaSeguidores.push(item)
            })
    }))
    return res.json(seguidores)
}
