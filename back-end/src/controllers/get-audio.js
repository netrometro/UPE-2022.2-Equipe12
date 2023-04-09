const cloudinary = require("../utils/cloudinary");
import { prisma } from "../lib/prisma"

const getAudio = async (req, res, next) => {
  try {

    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Usuário não autenticado" });
    }

    const userMusics = await prisma.music.findMany({ where: { userId } });
    const userMusicIds = userMusics.map((music) => music.asset_id);

    // Parâmetros de busca
    const options = await cloudinary.api.resources({
      resource_type: "raw",
      type: "upload",
      context: true,
      prefix: `AudioUploads/`,
      tags: "audio",
      max_results: 500,
    });
    console.log(options)

    // Executa a busca
    const userAudios = options.resources.filter((audio) =>
    userMusicIds.includes(String(audio.asset_id))
  );

    // Retorna os resultados
    res.status(200).json({ success: true, data: userAudios, message: "Busca por arquivos de áudio realizada com sucesso"  });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Erro ao buscar arquivos de áudio" });
  }
};

module.exports = getAudio;
