import path from "path";
import multer from "multer";

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      // console.log(req);
      cb(null, path.join(__dirname, "uploads/"));
    },
    filename: function (req, file, cb) {
      // console.log(req);
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
  fileFilter: function (req, file, cb) {
    // console.log(req);
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

export default upload;
