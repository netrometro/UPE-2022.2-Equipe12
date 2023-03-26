// função que permite o usuário parar de seguir outro usuário
import { prisma } from "../../lib/prisma"


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