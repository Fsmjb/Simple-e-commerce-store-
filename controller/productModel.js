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

const cartSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity: {
        type: Number,
        default: 1
    }
})

const productModel = mongoose.model("Product", productSchema);
const cartModel = mongoose.model("Cart", cartSchema);

export {
    productModel,
    cartModel
};

