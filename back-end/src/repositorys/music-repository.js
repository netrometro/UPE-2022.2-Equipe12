import { prisma } from "../lib/prisma"

export const importMusic = async (userId, fileName) => {
    const music = await prisma.music.create({
        data: {userId, fileName}
    });
    return music;
}