import { prisma } from "../../lib/prisma";

export const createPlaylist = async (req, res) => {
    const { name, musicIds } = req.body;
    const userId = req.userId;
    try {
        // Cria a nova playlist
        const playlist = await prisma.playlist.create({
            data: {
                name: name,
                user: {
                    connect: { id: userId },
                },
            },
        });

        // Adiciona as músicas selecionadas à playlist
        for (const musicId of musicIds) {
            await prisma.playlistMusic.create({
                data: {
                    playlist: {
                        connect: { id: playlist.id },
                    },
                    music: {
                        connect: { id: musicId },
                    },
                },
            });
        }

        res.status(200).json({ success: true, message: "Playlist criada com sucesso" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Erro ao criar playlist" });
    }
}

export const getPlaylist = async (req, res) => {
    const userId = req.userId;
    try {
        // Busca a playlist do usuário logado e inclui suas músicas
        const playlist = await prisma.playlist.findMany({
            where: {
                userId: userId
            },
            include: {
                playlistMusics: true
            }
        });

        if (!playlist) {
            return res.status(404).json({
                success: false,
                message: "Playlist não encontrada"
            });
        }

        res.status(200).json({ success: true, data: playlist, message: "Playlist encontrada com sucesso" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Erro ao buscar playlist" });
    }

}

import { prisma } from "../../lib/prisma";

export const deletePlaylist = async (req, res) => {
    const { name } = req.body;
    const userId = req.userId;

    try {
        // Busca a playlist do usuário logado com o nome especificado
        const playlist = await prisma.playlist.findUnique({
            where: {
                name: name,
              },
            include: {
                playlistMusics: true
            }
        });

        if (!playlist) {
            return res
                .status(404)
                .json({ success: false, message: "Playlist não encontrada" });
        }

        // Exclui as músicas relacionadas com a playlist
        await prisma.playlistMusic.deleteMany({
            where: {
                playlistId: playlist.id,
            },
        });

        // Exclui a playlist com base no ID
        await prisma.playlist.deleteMany({
            where: {
                id: playlist.id,
            },
        });

        res.status(200).json({
            success: true,
            message: `Playlist "${name}" excluída com sucesso`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Erro ao excluir playlist" });
    }
};
