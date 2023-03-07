const multer = require("multer");
const path = require("path");
const express = require('express');
const app = express();

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, __dirname + "/../uploads")
  },
  filename: function(req, file, cb){
    // filename: function(req, file, cb) {
    //   const extensaoArquivo = file.originalname.split
    // }
    const fileName = file.originalname.split("."); // separa o nome do arquivo da extensão
    const ext = fileName.pop(); // remove a extensão do nome do arquivo
    const newFileName = `${fileName.join("_")}_${Date.now()}.${ext}`; // adiciona o separador e a data
    cb(null, newFileName);
  }
})

const upload = multer ({storage})

// app.post("/upload", upload.single("Arquivo"), (req, res) => {
//     res.send("Arquivo recebido!");
// })

module.exports = upload.single("file");
