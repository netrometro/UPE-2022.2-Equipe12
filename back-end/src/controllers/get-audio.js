const cloudinary = require("../utils/cloudinary");

const getAudio = async (req, res, next) => {
  try {

    const userId = req.userId;
    const userToken = req.headers.authorization;
    const expression = `resource_type:raw AND folder=AudioUploads/${userId}/ AND context.custom.token=${userToken}`;

    // Parâmetros de busca
    const options = {
      resource_type: "raw",
      type: "upload",
      prefix: `AudioUploads/${userId}/`,
      // tags: "audio",
      // max_results: 10
    };

    // Executa a busca
    const result = await cloudinary.search
      .expression(expression)
      .sort_by("public_id", "desc")
      .execute(options);
      auth_token = req.headers.authorization;
      // .max_results(10)

      console.log(result.resources);

      // if (result.resources.length === 0) {
      //   return res.status(404).json({
      //     success: false,
      //     message: "Nenhuma música associada a você, por favor, faça um upload antes",
      //   });
      // }

    // Retorna os resultados
    res.status(200).json({ success: true, data: result.resources, message: "Busca por arquivos de áudio realizada com sucesso"  });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Erro ao buscar arquivos de áudio" });
  }
};

module.exports = getAudio;
