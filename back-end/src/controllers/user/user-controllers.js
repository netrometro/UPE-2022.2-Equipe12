import bcrypt from "bcrypt"
import { prisma } from "../../lib/prisma"


// função para criar usuário
export const create = async (req, res) => {
    const { email, password, username } = req.body
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
        const user = await prisma.user.create({ data: { email, username, password: hashPassword } })
        return res.status(200).send({ success: 'Usuário cadastrado com sucesso' })

    } catch (error) {
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

//função que atualiza dados do usuário
export const updateUser = async (req, res) => {
    const userId = req.params.userId;
    const { username, password, favorite_artist, favorite_music, favorite_genre, description } = req.body;

    try {
        const data = {};
        if (username) data.username = username;
        if (password) data.password = password;
        if (favorite_artist) data.favorite_artist = favorite_artist;
        if (favorite_music) data.favorite_music = favorite_music;
        if (favorite_genre) data.favorite_genre = favorite_genre;
        if (description) data.description = description;

        const user = await prisma.user.update({
            where: { id: userId },
            data: data,
        });
        return res.status(200).send({ success: 'Informações do usuário atualizadas com sucesso' });
    } catch (error) {
        return res.status(400).send({ error: 'Erro ao atualizar informações do usuário' });
    }
};

export const getInfoUser = async (req, res) => {
    const userId = req.params.userId;
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          username: true,
          favorite_artist: true,
          favorite_music: true,
          favorite_genre: true,
          description: true
        },
      });
      return res.status(200).send(user);
    } catch (error) {
      return res.status(400).send({ error: 'Erro ao obter informações do usuário' });
    }
  };