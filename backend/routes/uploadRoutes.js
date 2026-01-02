import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

// 1. Configure Storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/'); // Save to 'uploads' folder in the root
  },
  filename(req, file, cb) {
    // Naming convention: fieldname-date.extension (image-20231025.jpg)
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// 2. Validate File Type (Images only)
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// 3. The Route
// The frontend will send a POST request with a key named 'image'
router.post('/', upload.single('image'), (req, res) => {
  res.send({
    message: 'Image Uploaded',
    image: `/${req.file.path.replace(/\\/g, '/')}`, // Fix windows paths
  });
});

export default router;