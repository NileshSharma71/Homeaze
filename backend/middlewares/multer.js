import multer from "multer";

const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, file.originalname)
    }
});

const upload = multer({ storage: storage })

export default upload

//config multer middleware to handle file uploads by storing files on disk using their original filenames