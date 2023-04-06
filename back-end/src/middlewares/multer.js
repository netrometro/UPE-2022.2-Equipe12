const multer = require('multer');

// const storage = multer.diskStorage({
//   filename: function (req,file,cb) {
//     cb(null, file.originalname)
//   }
// });

// const upload = multer({storage: storage});

// module.exports = upload;

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const fileExt = file.originalname.split(".").pop();
    const filename = `${new Date().getTime()}.${fileExt}`;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "audio/mp3" || file.mimetype === "audio/mpeg") {
    cb(null, true);
  } else {
    cb(
      {
        message: "Formato de arquivo não suportado",
      },
      false
    );
  }
};

const upload = multer({
  storage,
  // limits: {
  //   fieldNameSize: 200,
  //   fileSize: 5 * 1024 * 1024,
  // },
  fileFilter,
}).single("audio");

module.exports = upload;

// Estou pegando os dados do formulário no front e colocando no banco de dados