const expressAsyncHandler = require("express-async-handler");
const Brand = require("../model/Brand");



//=============================== BRAND CREATE API ========================================

//@des Create a BRAND
//@routes POST api/brand
//@access public

const create = expressAsyncHandler(async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Name field is mandatory");
  }

  const brandExists = await Brand.findOne({ name });
  if (brandExists) {
    res.status(400);
    throw new Error("Brand already registered");
  }

  if (!req.file) {
    res.status(400);
    throw new Error("Logo is mandatory");
  }
  const logoUrl = `/uploads/${req.file.filename}` ;

  const brand = await Brand.create({
    name,
    description,
    logoUrl,
  });

  res.status(201).json({ message: "Brand registered!", brand });
});



//=============================== BRAND Update API ========================================

//@desc Update a BRAND
//@route PUT api/brand/:id
//@access public

const update = expressAsyncHandler(async (req, res) => {
    const { id }= req.params;
    const { name, description } = req.body;

    const brand = await Brand.findById( id );
    if (!brand) {
      res.status(404);
      throw new Error("Brand not found");
    }

    if (name , description){
        brand.name = name || brand.name;
        brand.description = description || brand.description;
    }

      if (req.file) {
      brand.logoUrl = `/uploads/${req.file.filename}`;
    }

    const Brnd = await brand.save();
  
    res.status(200).json({ message: "Brand updated!", brand: Brnd });
  });



//=============================== BRAND SPECIFIC BY ID Get API ========================================

  //@desc Get a BRAND by ID
//@route GET api/brand/:id
//@access public

const get_brand = expressAsyncHandler(async (req, res) => {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      res.status(404);
      throw new Error("Brand not found");
    }
  
    res.status(200).json(brand);
  });



//=============================== BRAND ALL Get API ========================================

  //@desc Get all BRANDS
//@route GET api/brands
//@access public

const get_brands = expressAsyncHandler(async (req, res) => {
    const brands = await Brand.find({});
    res.status(200).json(brands);
  });



//=============================== BRAND Delete API ========================================

//@desc Delete a BRAND
//@route DELETE api/brand/:id
//@access public

const deletee = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const brand = await Brand.findById(id);
    if (!brand) {
      res.status(404);
      throw new Error("Brand not found");
    }

    await brand.deleteOne();
  
    res.status(200).json({ message: "Brand deleted successfully" });
  });



module.exports = { create, update, get_brand, get_brands, deletee };
