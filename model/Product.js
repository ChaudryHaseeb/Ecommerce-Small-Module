const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    imageUrls: { type: String },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    brand_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true },
  },{
    timestamps:true,
  }
);

  const Product = mongoose.model('Product', productSchema);

module.exports = Product;