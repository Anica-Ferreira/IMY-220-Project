/* Anica Ferreira 40_u24581802 */
const multer = require('multer');
const path = require('path');
const fs = require('fs');

//set destination for files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const projectId = req.body.projectId;
        const projectName = req.body.projectName;
        const folderPath = path.join("backend", "uploadedFiles", `${projectId}-${projectName}`);

        //create folder for project
        fs.mkdirSync(folderPath, { recursive: true });
        cb(null, folderPath);
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

//middleware for multer
const uploadFiles = multer({ storage });

//controller function
const handleFileUpload = (req, res) => {
    if(!req.files || req.files.length === 0) {
        return res.status(400).json({ 
            error: true, 
            error_message: "No file uploaded" 
        });
    }

    const projectId = req.body.projectId;
    const projectName = req.body.projectName;

    const uploadedFiles = req.files.map(file => ({
        filename: file.filename,
        path: `/uploadedFiles/${projectId}-${projectName}/${file.filename}`,
        size: file.size
    }));

    return res.status(200).json({
        error: false,
        message: "Files uploaded successfully",
        files: uploadedFiles
    });
};

module.exports = {
    uploadFiles,
    handleFileUpload
}