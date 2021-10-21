import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import multer from "multer";
import aws from "aws-sdk";
import multerS3 from "multer-s3";
const router = express.Router();

aws.config.update({
  secretAccessKey: process.env.AWS_KEY,
  accessKeyId: process.env.AWS_KEY_ID,
  region: process.env.AWS_REGION,
});
const s3 = new aws.S3();
const storage = multerS3({
  s3: s3,
  bucket: process.env.BUCKET,
  key: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const fileTypes = /jpeg|jpg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images Only!");
  }
}
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/", upload.single("image"), (req, res) => {
  try {
    console.log(req.file);
    res.send(`${req.file.location}`);
  } catch (error) {
    console.log(error);
  }
});
export default router;
