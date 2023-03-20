const prisma = require("../prisma/client");

const { createHash } = require('crypto');
const fs = require('fs');

async function importMusic(userId, filePath) {
  const { name, ext } = parseFilePath(filePath);
  const hash = await generateFileHash(filePath);

  const music = await prisma.music.create({
    data: {
      name,
      ext,
      hash,
      createdBy: {
        connect: { id: userId }
      }
    }
  });

  return music;
}

async function getMusic(req, res) {
  const musicId = req.params.id;

  const music = await prisma.music.findUnique({
    where: { id: parseInt(musicId) }
  });

  if (!music) {
    return res.status(404).send("Music not found");
  }

  const filePath = getFilePath(music.hash, music.ext);

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize-1;

    const chunkSize = (end-start) + 1;
    const file = fs.createReadStream(filePath, {start, end});
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "audio/mp3"
    };

    res.writeHead(206, headers);
    file.pipe(res);
  } else {
    const headers = {
      "Content-Length": fileSize,
      "Content-Type": "audio/mp3"
    };
    res.writeHead(200, headers);
    fs.createReadStream(filePath).pipe(res);
  }
}

async function deleteMusic(hash) {
  const music = await prisma.music.findUnique({
    where: { hash }
  });

  if (!music) {
    throw new Error("Music not found");
  }

  const filePath = getFilePath(music.hash, music.ext);
  fs.unlinkSync(filePath);

  await prisma.music.delete({
    where: { id: music.id }
  });
}

function getFilePath(hash, ext) {
    return path.join(__dirname, '..', 'uploads', `${hash}.${ext}`);
}

function parseFilePath(filePath) {
  const parts = filePath.split(".");
  const ext = parts.pop();
  const name = parts.join(".");
  return { name, ext };
}

function generateFileHash(filePath) {
  return new Promise((resolve, reject) => {
    const hash = createHash('sha1');
    const stream = fs.createReadStream(filePath);

    stream.on('error', (err) => {
      reject(err);
    });

    stream.on('data', (chunk) => {
      hash.update(chunk);
    });

    stream.on('end', () => {
      resolve(hash.digest('hex'));
    });
  });
}

module.exports = {
  importMusic,
  getMusic,
  deleteMusic,
};