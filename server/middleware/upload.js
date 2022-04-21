const path = require('path');
const multer = require('multer');
const ApiError = require('../exceptions/api-error');
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

let upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg') {
      callback(null, true);
    } else {
      callback(null, false);
      throw ApiError.BadRequest('Only jpg and png formats are supported');
    }
  },
  limits: { fileSize: 1024 * 1024 * 2 },
});

module.exports = upload;
