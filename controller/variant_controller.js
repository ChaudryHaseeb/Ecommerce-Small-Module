const expressAsyncHandler = require("express-async-handler");
const Product = require("../model/Product");
const Variant = require("../model/Variant");



//=============================== VARIANT CREATE API ========================================

//@des Create a Variant
//@routes POST api/product/:id/variant
//@access public

const create = expressAsyncHandler(async (req, res) => {
    const { id: product_id } = req.params;
    const { variantName, variantOptions } = req.body;

    if (!variantName || !variantOptions || !Array.isArray(variantOptions) || variantOptions.length === 0) {
      res.status(400);
      throw new Error("All fields are mandatory, and variantOptions must be a non-empty array.");
    }

    const productExists = await Product.findById(product_id);
    if (!productExists) {
      res.status(404);
      throw new Error("Product not found");
    }

    const variantExists = await Variant.findOne({ product_id, variantName });
    if (variantExists) {
      res.status(400);
      throw new Error("Variant with this name already exists for the product.");
    }

    const variant = await Variant.create({
      variantName,
      product_id,
      variantOptions,
    });

    res.status(201).json({ message: "Variant registered!", variant });
});



//=============================== VARIANT UPDATE API ========================================

//@des Create a Variant
//@routes PUT api/product/:id/variant/:id
//@access public

const update = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const { variantName, variantOptions } = req.body;

    const variantExists = await Variant.findById(id);
    if (!variantExists) {
      res.status(400);
      throw new Error("Variant is not Found.");
    }
    if(variantName, variantOptions){
        variantExists.variantName = variantName;
        variantExists.variantOptions = variantOptions;
    }

    const variant = await variantExists.save();

    res.status(201).json({ message: "Variant Updated Successfully!", variant });
});



//=============================== VARIANT GET SPECIFIC VARIANT API ========================================

//@des Create a Variant
//@routes GET api/product/:id/variant/:id
//@access public

const get_variant = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const variantExists = await Variant.findById(id);

    if (!variantExists) {
      res.status(400);
      throw new Error("Variant is not Found.");
    }

    res.status(201).json( variantExists );
});



//=============================== VARIANT GET ALL VARIANT API ========================================

//@des Create a Variant
//@routes GET api/product/:id/variants
//@access public

const get_variants = expressAsyncHandler(async (req, res) => {
    const variants = await Variant.find({});

    if (variants.length === 0) {
      res.status(400);
      throw new Error("Not Found Any Varaint.");
    }

    res.status(201).json( variants );
});



//=============================== VARIANT DELETE SPECIFIC VARIANT API ========================================

//@des Create a Variant
//@routes GET api/product/:id/variant/:id
//@access public

const deletee = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const variantExists = await Variant.findById(id);

    if (!variantExists) {
      res.status(400);
      throw new Error("Variant is not Found.");
    }
    const variantDelete= await Variant.deleteOne({_id: id })

    res.status(201).json({mesage:"Variant Deleted Successfully", variantDelete});
});



module.exports = { create, update, get_variant, get_variants, deletee };