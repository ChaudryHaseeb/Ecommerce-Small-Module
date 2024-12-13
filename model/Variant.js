const mongoose = require("mongoose");

const VariantSchema = new mongoose.Schema({
    variantName: { type: String, required: true },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    variantOptions: [
    {
        type: {
            type: String,
            enum: [
                "size",
                "color",
                "material",
                "weight",
                "style",
                "pattern",
                "length",
                "width",
                "height",
                "flavor",
                "gender",
                "occasion",
                "ageGroup",
                "technology",
                "fabric",
                "shape",
                "season",
                "bundle",
                "edition",
                "power",
                "storage",
                "resolution",
                "connectivity",
                "durability",
            ],
            required: true,
        },
        label: { type: String, required: true },
        price: { type: Number, required: true },
        value: { type: String, required: true },
    },
    ],
});

const Variant = mongoose.model("Variant", VariantSchema);

module.exports = Variant;