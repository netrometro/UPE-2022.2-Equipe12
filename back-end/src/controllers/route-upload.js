const express = require('express');
const router = express.Router();
const fs = require("fs");
const cloudinary = require("../utils/cloudinary");
const upload = require("../middlewares/multer");
import { prisma, DateTime } from "../lib/prisma"
const auth = require("../middlewares/auth");

const uploadCloudinary = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.send(err);
    }

    const { path } = req.file;

    const fName = req.file.originalname.split(".")[0];

    const userId = req.userId;

    try {

      if (!req.file) {
        return res.status(400).json({ error: "Nenhum arquivo enviado. Por favor, selecione um arquivo para envio." });
      }

      cloudinary.uploader.upload(
        path,
        {
          resource_type: "raw",
          public_id: `AudioUploads/${fName}`,
        },
        async (err, audio) => {
          if (err) return res.send(err);

          const savedAudio = await prisma.music.create({
            data: {
              filename: fName,
              asset_id: audio.asset_id,
              public_id: audio.public_id,
              user: {
                connect: {
                  id: userId,
                },
              },
              signature: audio.signature,
              resource_type: audio.resource_type,
              version: audio.version,
              version_id: audio.version_id,
              created_at: audio.created_at,
              bytes: audio.bytes,
              type: audio.type,
              etag: audio.etag,
              placeholder: audio.placeholder,
              url: audio.url,
              secure_url: audio.secure_url,
              folder: audio.folder,
              original_filename: audio.original_filename,
              api_key: audio.api_key,
              id: audio.id,
            },
          });
          console.log("Upload realizado com sucesso!");
          fs.unlinkSync(path);
          res.send(savedAudio);
        }
      );
    } catch (error) {
      console.error(`Erro ao fazer upload do arquivo: ${error.message}`);
      res.status(500).json({ message: "Erro ao fazer upload do arquivo" });
    }
  });
}

module.exports = uploadCloudinary;