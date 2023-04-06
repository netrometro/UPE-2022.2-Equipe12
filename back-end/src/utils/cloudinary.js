const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  resource_type: "raw",
});

module.exports = cloudinary;

// export function uploadFile(fileUploaded) {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.upload(
//       fileUploaded,
//       { resource_type: "auto" },
//       (err, res) => {
//         if (err) reject(err);
//         resolve(res);
//       }
//     );
//   });
// }
