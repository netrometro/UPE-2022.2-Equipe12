const multer = require('multer');

module.exports = (multer({
    storage: multer.diskStorage({
      destination: (req, file, cd) => {
        cb(null, './uploads')
      },
      filename: (req, file, cb) => {
        cb(null, Date.now().toString + "_" + file.originalname)
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