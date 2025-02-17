import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: [3, "Product name must be at least 3 characters long"],
        maxlength: [100, "Product name must be less than 100 characters"]
    },
    price: {
        type: Number,
        min: [0, "Price cannot be negative"]
    },
    imageUrl: {
        type: String,
    },
});

const productModel = mongoose.model("Product", productSchema);

export default productModel;

