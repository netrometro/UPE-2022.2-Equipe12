import bcrypt from "bcrypt"
import { prisma } from "../lib/prisma"


// função para criar usuário
export const create = async (req, res) => {
    const {email,password,username} = req.body
    try {
        const existingUser = await prisma.user.findUnique({ where: { email } })
        if (existingUser) {
            return res.status(400).send({ error: 'Usuário com esse email já existe!' })
        }
        const existingUsername = await prisma.user.findUnique({ where: { username } })
        if (existingUsername) {
            return res.status(400).send({ error: 'Usuário com esse username já existe!' })
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({ data: { email, username, password:hashPassword } })
        return res.status(200).send({ success: 'Usuário cadastrado com sucesso' })

    } catch (e) {
        return res.status(400).send({ error: 'Erro no registro' })

    }
}

//função que puxa todos os usuários
export const getUsers = async (req, res) => {
    const users = await prisma.user.findMany();
    return res.json({ users })
}

// função que pesquisa um usuário pelo seu username
export const getUser = async (req, res) => {
    const { username } = req.query;
    const user = await prisma.user.findUnique({ where: { username } })

    if (!user) {
        return res.json('Não existe usuário com esse username')
    }
    const { id } = user;
    return res.json({ user: { id, username } })

}

// função que permite o usuário seguir outro usuário
export const followUser = async (req, res) => {
    const { followerId, followingId } = req.body;

    try {
        const follow = await prisma.follows.create({
            data: {
                follower: { connect: { id: followerId } },
                following: { connect: { id: followingId } }
            }
        })

        return res.json(follow)
    } catch (e) {
        return res.status(400).send("Você já segue o usuário")
    }


}

// função que permite o usuário parar de seguir outro usuário
export const unfollowUser = async (req, res) => {
    console.log(req.body)

    const { followerId, followingId } = req.body;
    console.log(req.body)


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
    const { followerId } = req.query;
    console.log(followerId)
    const seguidores = {
        followerId: followerId,
        listaSeguidores: []
    }
    seguidores.listaSeguidores = await prisma.user.findUnique({
        where: { id: seguidores.followerId },
        select: {
            followers: {
                select: {
                    follower: {
                        select: {
                            id: true,
                            username: true

                        }

                    }
                }
            }
        }
    })
    return res.json(seguidores)
}

//função que permite o usuário ver quem ele segue
export const followingsUser = async (req, res) => {
    const { followerIngId } = req.params;
    const currentUser = req.userId;

    const follows = await prisma.follows.findMany({ where: { followingId: followerIngId }, distinct: ['followingId'] })
    const seguindo = {
        followerIngId,
        listaSeguindo: []
    }
    await Promise.all(follows.map(async (item, index) => {
        if (item.followingId !== currentUser) {
            const user = await prisma.user.findUnique({ where: { id: item.followingId }, select: { id: true, username: true } })
                .then(item => {
                    console.log("User", item)
                    seguindo.listaSeguindo.push(item)
                })
        }
    }))
    return res.json(seguindo)
}


