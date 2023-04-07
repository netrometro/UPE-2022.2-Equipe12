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

    const userId = req.body;

    console.log(req.headers)
    console.log(req.userId);

    cloudinary.uploader.upload(
      path,
      {
        resource_type: "raw",
        public_id: `AudioUploads/${fName}`,
      },
      async (err, audio) => {
        if (err) return res.send(err);
    
        // Save the audio file to the database and associate it with the user
        const savedAudio = await prisma.music.create({
          data: {
            filename: fName,
            assetId: audio.asset_id,
            publicId: audio.public_id,
            asset_id: audio.asset_id,
            userId: {
              connect: {
                id: userId,
              },
            },
            public_id: audio.public_id,
            folder: audio.folder,
            format: audio.format,
            version: audio.version,
            resource_type: audio.resource_type,
            type: audio.type,
            created_at: audio.created_at,
            uploaded_at: audio.uploaded_at,
            bytes: audio.bytes,
            backup_bytes: audio.backup_bytes,
            url: audio.url,
            secure_url: audio.secure_url,
            status: audio.status,
            access_mode: audio.access_mode,
            etag: audio.etag,
            id: audio.id,
            access_control: audio.access_control,
          },
        });

        fs.unlinkSync(path);
        res.send(savedAudio);
      }
    );
  });
}

module.exports = uploadCloudinary;