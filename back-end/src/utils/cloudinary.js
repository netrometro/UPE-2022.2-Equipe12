const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

module.exports = cloudinary;

// export function uploadMusic(musicUploaded) {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.upload(
//       musicUploaded,
//       { width: 400, height: 300, crop: "fill" },
//       (err, res) => {
//         if (err) reject(err);
//         resolve(res);
//       }
//     );
//   });
// }
