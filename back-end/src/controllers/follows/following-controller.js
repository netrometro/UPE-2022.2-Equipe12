import { prisma } from "../../lib/prisma"


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