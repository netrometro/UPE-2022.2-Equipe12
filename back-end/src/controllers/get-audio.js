const cloudinary = require("../utils/cloudinary");

const getAudio = async (req, res, next) => {
  try {
    // Parâmetros de busca
    const options = {
      resource_type: "raw",
      type: "upload",
      prefix: "AudioUploads/",
      // tags: "audio",
      // max_results: 10
    };

    // Executa a busca
    const result = await cloudinary.search
      .expression(`resource_type:raw`)
      .sort_by("public_id", "desc")
      // .max_results(10)
      .execute();

    // Retorna os resultados
    res.status(200).json({ success: true, data: result.resources, message: "Busca por arquivos de áudio realizada com sucesso"  });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Erro ao buscar arquivos de áudio" });
  }
};

module.exports = getAudio;
