/* Anica Ferreira 40_u24581802 */
import express, { Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const app = express();

const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: Function) => {
        cb(null, "uploads/");
    },
    filename: (req: Request, file: Express.Multer.File, cb: Function) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.use(express.static("frontend/public"));

app.use("/uploads", express.static("uploads"));

//upload a file endpoint
app.post("/upload", upload.single("file"), (req: Request, res: Response) => {
    res.send({
        message: "File uploaded successfully.",
    });
});

//get all files endpoint
app.get("/files", (req: Request, res: Response) => {
    const dir = "uploads";
    
    const files = fs.readdirSync(dir).map((name) => ({
        image: name,
        url: `/uploads/${name}`,
    }));
    res.json(files);
});

app.listen(3000, () =>
  console.log("Server running on http://localhost:3000")
);