const expressAsyncHandler = require("express-async-handler");
const Product = require("../model/Product");
const Brand = require("../model/Brand");
const User = require("../model/User");
const Category = require("../model/Category");



//=============================== Product CREATE API ========================================

//@des Create a Product
//@routes POST api/product
//@access public

const create = expressAsyncHandler(async (req, res) => {
  const { name, description, price, user_id, category_id, brand_id } = req.body;

  if (!name || !price || !user_id || !category_id || !brand_id) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const userExists = await User.findOne({ _id: user_id });
  if (!userExists) {
    res.status(400);
    throw new Error("User not Found");
  }

  const brandExists = await Brand.findOne({ _id: brand_id });
  if (!brandExists) {
    res.status(400);
    throw new Error("Brand not Found");
  }
  
  const categoryExists = await Category.findOne({ _id: category_id });
  if (!categoryExists) {
    res.status(400);
    throw new Error("Category not Found");
  }
  
  const productExists = await Product.findOne({ name });
  if (productExists) {
    res.status(400);
    throw new Error("Product already registered");
  }

  if (!req.file) {
    res.status(400);
    throw new Error("Logo is mandatory");
  }
  const imageUrls = `/uploads/Products/${req.file.filename}` ;

  const product = await Product.create({
    name,
    description,
    price,
    user_id,
    category_id,
    brand_id,
    imageUrls,
  });

  res.status(201).json({ message: "Product registered!", product });
});



//=============================== Product Update API ========================================

//@desc Update a Product
//@route PUT api/product/:id
//@access public

const update = expressAsyncHandler(async (req, res) => {
    const {id}= req.params;
    const { name, description, price, user_id, category_id, brand_id } = req.body;
  
    if (user_id) {
      const userExists = await User.findById(user_id);
      if (!userExists) {
        res.status(400);
        throw new Error("User not found");
      }
    }
  
    if (category_id) {
      const categoryExists = await Category.findById(category_id);
      if (!categoryExists) {
        res.status(400);
        throw new Error("Category not found");
      }
    }
  
    if (brand_id) {
      const brandExists = await Brand.findById(brand_id);
      if (!brandExists) {
        res.status(400);
        throw new Error("Brand not found");
      }
    }
    const product = await Product.findById(id);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }
  
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.user_id = user_id || product.user_id;
    product.category_id = category_id || product.category_id;
    product.brand_id = brand_id || product.brand_id;
  
    if (req.file) {
      product.imageUrls = `/uploads/Products/${req.file.filename}`;
    }
  
    const updatedProduct = await product.save();
  
    res.status(200).json({ message: "Product updated!", product: updatedProduct });
  });
  


//=============================== Product SPECIFIC BY brand ID Get API ========================================

//@desc Get a Product by brand ID
//@route GET api/product/brand/:id
//@access public

const get_product_brand = expressAsyncHandler(async (req, res) => {
    const { id }= req.params;
    const product = await Product.find({brand_id: id})
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    res.status(200).json(product);
  });
  


//=============================== Product SPECIFIC BY category ID Get API ========================================

//@desc Get a Product by category ID
//@route GET api/product/category/:id
//@access public

const get_product_category = expressAsyncHandler(async (req, res) => {
    const { id }= req.params;
    const product = await Product.find({category_id: id})
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    res.status(200).json(product);
  });



//=============================== Product SPECIFIC BY ID Get API ========================================

//@desc Get a Product by ID
//@route GET api/product/:id
//@access public

const get_product = expressAsyncHandler(async (req, res) => {
    const { id }= req.params;
    const product = await Product.findById(id).populate('category_id', 'name');
  
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }
  
    res.status(200).json(product);
  });
  

//=============================== Products ALL Get API ========================================


//@desc Get all Products
//@route GET api/products
//@access public

const get_products = expressAsyncHandler(async (req, res) => {
    const products = await Product.find({}).populate('category_id', 'name')
    res.status(200).json(products);
  });
  


//=============================== Product Delete API ========================================

//@desc Delete a Product by ID
//@route DELETE api/product/:id
//@access public

const deletee = expressAsyncHandler(async (req, res) => {
    const  { id }= req.params;
    const product = await Product.findById(id);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }
    await product.deleteOne();
    res.status(200).json({ message: "Product deleted successfully" });
  });


module.exports = { create, update, get_product, get_products, deletee, get_product_brand, get_product_category };
