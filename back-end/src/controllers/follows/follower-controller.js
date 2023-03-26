import { prisma } from "../../lib/prisma"

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
