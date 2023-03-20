const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const express = require('express');
const app = express();

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, __dirname + "/../uploads")
  },
  filename: function(req, file, cb){
    const hash = crypto.createHash("sha256");
    file.on("data", data => hash.update(data));
    file.on("end", () => {
      const newFileName = `${hash.digest("hex")}.${file.originalname.split(".").pop()}`;
      cb(null, newFileName);
    });
  }
})

const upload = multer ({storage})

module.exports = upload.single("file");
