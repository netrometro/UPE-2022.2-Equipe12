import { prisma } from "../lib/prisma"

export const createUser = async (data) => {
    const user = await prisma.user.create({
        data,
        select: {
            id: true,
            name: true,
            email: true,
            password: false,
            created_at: true,
            update_at: true
        },
    });
    return user;
}