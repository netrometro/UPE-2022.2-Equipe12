const express = require('express');
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../middlewares/multer");

 router.post('/upload', upload.single('music'), function (req, res) {
  cloudinary.uploader.upload(req.file.path, function (err, result){
    if(err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Erro: Upload não realizado com sucesso!"
      })
    }

    res.status(200).json({
      success: true,
      message:"Upload realizado com sucesso!!",
      data: result
    })
  })
});

module.exports = router;

// O que eu estou fazendo aqui é pegar os dados do formulário e colocar no banco de dados