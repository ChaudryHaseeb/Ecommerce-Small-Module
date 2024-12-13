const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    products: [
    {
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true
        },
        price:{
            type: Number,
            require: true,
        },
    }
    ],
    totalAmount: {
            type: Number,
            required: true,
        },
    status: {
            type: String,
            enum: ["Pending", "Shipped", "Completed", "Cancelled"],
            default: "Pending"
        }
},  {
    timestamps: true,
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order