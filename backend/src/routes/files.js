/* Anica Ferreira 40_u24581802 */
const express = require('express');
const router = express.Router();

const { uploadFiles, handleFileUpload } = require("../controllers/fileController");

router.post('/upload', uploadFiles.array('files', 20), handleFileUpload);

module.exports = router;