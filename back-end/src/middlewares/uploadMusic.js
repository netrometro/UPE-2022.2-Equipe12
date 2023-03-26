const multer = require('multer');

module.exports = (multer({
    // limits: {
    //   fileSize: 10 * 1024 * 1024 // 10MB
    // },
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, './public/upload/users')
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