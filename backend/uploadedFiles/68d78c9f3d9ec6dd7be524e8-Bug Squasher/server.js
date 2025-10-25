"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Anica Ferreira 40_u24581802 */
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage });
app.use(express_1.default.static("frontend/public"));
app.use("/uploads", express_1.default.static("uploads"));
//upload a file endpoint
app.post("/upload", upload.single("file"), (req, res) => {
    res.send({
        message: "File uploaded successfully.",
    });
});
//get all files endpoint
app.get("/files", (req, res) => {
    const dir = "uploads";
    const files = fs_1.default.readdirSync(dir).map((name) => ({
        image: name,
        url: `/uploads/${name}`,
    }));
    res.json(files);
});
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
