const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Ungültiger Dateityp. Nur JPEG, PNG, JPG und WEBP erlaubt."));
  }
};

const upload = multer({
  storage,
  fileFilter,
  //10mb limit und sizing
  limits: { fileSize: 10 * 1024 * 1024 }, 
});

module.exports = upload;
