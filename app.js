import express from "express";
import "dotenv/config";
import upload from "./controller/multer.js";
import connect from "./controller/db.js";
import productModel from "./controller/productModel.js";

connect();

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.static("public"));


app.get("/", async(req, res) => {
    const products = await productModel.find();
    res.render("index", {data : products});
});

app.get("/add", (req, res) => {
    res.render("addProduct")
});

app.post("/add/submit", upload.single("image"), (req, res) => {
    try {
        const { filename } = req.file;
        const { name, price } = req.body;
        if (!filename || !name || !price) {
            res.status(400).json({ error: "All fiels are required" });
        }

        const newproduct = new productModel({
            name,
            price,
            imageUrl: filename
        });

        newproduct.save();
        res.redirect("/add");
    } catch (err) {
        res.status(500).json({ error: "something worng", code: 1 });
    }

});


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
