/* Anica Ferreira 40_u24581802 */
const express = require('express');
const router = express.Router();

const { uploadImages, handleUpload } = require("../controllers/imageController");

router.post('/upload/profile', uploadImages.single('file'), handleUpload);
router.post('/upload/project', uploadImages.single('file'), handleUpload);

module.exports = router;