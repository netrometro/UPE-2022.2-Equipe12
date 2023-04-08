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

    //const expression = `folder=AudioUploads/${userId}`;

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

    const userAudios = options.resources.filter((audio) =>
    userMusicIds.includes(audio.asset_id)
  );

    // Executa a busca
    // const result = await cloudinary.search
    //   .expression()
    //   .sort_by("filename", "desc")
    //   .execute(options);
      //auth_token = req.headers.authorization;
      // .max_results(10)

      // console.log(result.resources);

      // if (result.resources.length === 0) {
      //   return res.status(404).json({
      //     success: false,
      //     message: "Nenhuma música associada a você, por favor, faça um upload antes",
      //   });
      // }

    // Retorna os resultados
    res.status(200).json({ success: true, data: userAudios, message: "Busca por arquivos de áudio realizada com sucesso"  });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Erro ao buscar arquivos de áudio" });
  }
};

module.exports = getAudio;
