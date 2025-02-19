import express from "express";
import "dotenv/config";
import upload from "./controller/multer.js";
import connect from "./controller/db.js";
import {productModel, cartModel} from "./controller/productModel.js";

connect();

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", async(req, res) => {
    const products = await productModel.find();
    const cart = await cartModel.find().populate('productId'); 
    res.render("index", {data : products, cart : cart});
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

app.post("/addtocart", async(req, res) => {
   try{
    const {productId} = req.body;

    const newcart = new cartModel({
        productId
    });
    newcart.save();
    res.json({message: "Success:"});
   }
   catch(err){
       res.status(500).json({error: "Something went wrong"});
   }
    
})

app.post("/removecart", async(req, res) => {
 try{
    const { productId } = req.body;
    
    await cartModel.findByIdAndDelete(productId);
    res.json({message: "Success:"});
 }
 catch(err){
    res.status(500).json({error: "Something went wrong"});
 }
});

app.post("/increase", async(req, res) => {
 try{
    const { productId } = req.body;
    
    const product = await cartModel.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    await cartModel.findByIdAndUpdate(productId, { quantity: product.quantity + 1 });
    res.json({message: "Success:"});
 }
 catch(err){
    res.status(500).json({error: "Something went wrong"});
 }
});

app.post("/decrease", async(req, res) => {
 try{
    const { productId } = req.body;

    const product = await cartModel.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    await cartModel.findByIdAndUpdate(productId, { quantity: product.quantity - 1 });
    res.json({message: "Success:"});
 }
 catch(err){
    res.status(500).json({error: "Something went wrong"});
 }
});


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
