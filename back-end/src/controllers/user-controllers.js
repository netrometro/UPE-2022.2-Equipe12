import bcrypt from "bcrypt"
import { prisma } from "../lib/prisma"

import {userValidation} from "../validators/user-validation"
import { createUser } from "../repositorys/user-repositorys";


// função para criar usuário
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

//função que puxa todos os usuários
export const getUsers = async(req,res) =>{
    const users = await prisma.user.findMany();
    return res.json({users})
}

// função que pesquisa um usuário pelo seu username
export const getUser = async(req,res) => {
    const {username} = req.body;
    const user = await prisma.user.findUnique({where:{username}})

    if(!user){
        return res.json('User not found')
    }

    const {id} = user;
    return res.json({user:{id,username}})
    
}

// função que permite o usuário seguir outro usuário
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

// função que permite o usuário parar de seguir outro usuário
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

  // função para ver os seguidores do usuário
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
