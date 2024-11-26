import { createWorker } from "tesseract.js";
import express from "express";
import multer from "multer";
const app = express();
const upload = multer({ dest: "./public/data/uploads/" });
app.use(express.json());
app.post("/ocr", upload.single("file"), async (req, res) => {
    const text = await ocr(req.file.path);
    res.json({
        data: text,
    });
});
app.listen(3000, () => {
    console.log("runnning");
});
const ocr = async (file) => {
    const worker = await createWorker("eng");
    const ret = await worker.recognize(file);
    const text = ret.data.text;
    await worker.terminate();
    return text;
};
