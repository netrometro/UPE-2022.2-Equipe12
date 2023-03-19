import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const importMusic = async (userId, fileName) => {
  try {
    await prisma.$connect(); // garante que a conexão com o banco de dados está estabelecida
    const music = await prisma.music.create({
      data: { userId, fileName },
    });
    return music;
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect(); // encerra a conexão com o banco de dados
  }
};
