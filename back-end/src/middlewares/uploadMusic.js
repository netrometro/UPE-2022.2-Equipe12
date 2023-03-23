const multer = require('multer');

module.exports = (multer({
    limits: {
      fileSize: 5 * 1024 * 1024, // 5 MB em bytes
    },
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, './uploads')
      },
      filename: (req, file, cb) => {
        cb(null, Date.now().toString() + "_" + file.originalname)
      }
    }),
    fileFilter: (req, file, cb) => {
      const extensaoMusica =['audio/mpeg', 'audio/mp4', 'audio/x-aiff', 'audio/x-aiff'].find
      (formatoAceito => formatoAceito == file.mimetype);

      if(extensaoMusica){
        return cb(null, true);
      }
      return cb(null, false);
    }
}))