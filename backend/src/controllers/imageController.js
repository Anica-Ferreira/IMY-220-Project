/* Anica Ferreira 40_u24581802 */
const multer = require('multer');
const path = require('path');
const fs = require('fs');

//set destination for files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (req.body.userId) {
            cb(null, "backend/uploadedImages/profiles/");
        } else if (req.body.projectId) {
            cb(null, "backend/uploadedImages/projects/");
        }
    },
    filename: function (req, file, cb) {
        // Get id of whichever image was sent
        const id = req.body.userId || req.body.projectId;
        const type = req.body.userId ? "user" : "project";
        const ext = path.extname(file.originalname);
        const uniqueSuffix = Date.now();
        cb(null, `${type}-${id}-${uniqueSuffix}${ext}`);
    }
});

//middleware for multer
const uploadImages = multer({ storage });

//controller function
const handleUpload = (req, res) => {
    if(!req.file) {
        return res.status(400).json({ 
            error: true, 
            error_message: "No file uploaded" 
        });
    }

    const folder = req.body.userId ? "profiles" : "projects";
    const uploadDir = path.join(__dirname, '../..', 'uploadedImages', folder);
    const id = req.body.userId || req.body.projectId;
    const newFile = req.file.filename;

    //delete old profile image of user
    try {
        const files = fs.readdirSync(uploadDir);
        for(const file of files) {
            if(file.includes(`-${id}-`) && file !== newFile) {
                fs.unlinkSync(path.join(uploadDir, file));
            }
        }
    } catch (err) {
        console.error(err);
    }

    return res.status(200).json({
        error: false,
        message: "Image uploaded successfully",
        filename: req.file.filename,
        path: `/uploadedImages/${folder}/${req.file.filename}`
    });
};

module.exports = { 
    uploadImages, 
    handleUpload 
};
