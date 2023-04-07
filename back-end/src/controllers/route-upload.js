const express = require('express');
const router = express.Router();
const fs = require("fs");
const cloudinary = require("../utils/cloudinary");
const upload = require("../middlewares/multer");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const auth = require("../middlewares/auth");


const uploadCloudinary = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.send(err);
    }

    const { path } = req.file;

    const fName = req.file.originalname.split(".")[0];

    const userId = req.user.id;

    cloudinary.uploader.upload(
      path,
      {
        resource_type: "raw",
        public_id: `AudioUploads/${fName}`,
      },
      async (err, audio) => {
        if (err) return res.send(err);
    
        // Save the audio file to the database and associate it with the user
        const savedAudio = await prisma.audio.create({
          data: {
            filename: fName,
            assetId: audio.asset_id,
            publicId: audio.public_id,
            userId: userId,
          },
        });
    
        fs.unlinkSync(path);
        res.send(savedAudio);
      }
    );
  });
}

module.exports = uploadCloudinary;
//  router.post('/upload', upload.single('music'), function (req, res) {
//   cloudinary.uploader.upload(req.file.path, function (err, result){
//     if(err) {
//       console.log(err);
//       return res.status(500).json({
//         success: false,
//         message: "Erro: Upload não realizado com sucesso!"
//       })
//     }

//     res.status(200).json({
//       success: true,
//       message:"Upload realizado com sucesso!!",
//       data: result
//     })
//   })
// });



// O que eu estou fazendo aqui é pegar os dados do formulário e colocar no banco de dados