const express = require('express');
const router = express.Router();
const fs = require("fs");
const cloudinary = require("../utils/cloudinary");
const upload = require("../middlewares/multer");

const uploadCloudinary = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.send(err);
    }

    const { path } = req.file;

    const fName = req.file.originalname.split(".")[0];

    // const userId = req.user.id;

    cloudinary.uploader.upload(
      path,
      {
        resource_type: "raw",
        public_id: `AudioUploads/${fName}`,
      },
      (err, audio) => {
        if (err) return res.send(err);

        fs.unlinkSync(path);
        res.send(audio);
      }
    );
  });
}

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

module.exports = uploadCloudinary;

// O que eu estou fazendo aqui é pegar os dados do formulário e colocar no banco de dados