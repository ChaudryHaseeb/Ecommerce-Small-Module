const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    logoUrl: { type: String },
  },{
    timestams: true
});


const Brand = mongoose.model('Brands', brandSchema);

module.exports = Brand;