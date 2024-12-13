const expressAsyncHandler = require("express-async-handler");
const Category = require("../model/Category");



//=============================== CATEGORY CREATE API ========================================


//@des create a CATEGORY
//@routes POST api/category
//@access public


const create = expressAsyncHandler(async (req, res) => {
    const { name, description } = req.body;
    if (!name) {
      res.status(400);
      throw new Error("Name field is mandatory");
    };

    const categoryAvailable = await Category.findOne({ name });
    if (categoryAvailable) {
      res.status(400);
      throw new Error("category already registered");
    };

    const category = await Category.create({
      name,
      description,
    });
    res.status(200).json({message: "Category registered!", category});
})




//=============================== CATEGORY UPDATE API ========================================


//@desc Update a CATEGORY by ID
//@route PUT /api/category/:id
//@access public


const update = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    const category = await Category.findById(id);
    if (!category) {
        res.status(404);
        throw new Error("Category not found");
    }

    if (name , description){
        category.name = name;
        category.description = description;
    }

    const Ctg = await category.save();
    res.status(200).json({ message: "Category updated successfully", Ctg });
});




//=============================== CATEGORY GET SPECIFIC CATEGORY API ========================================



//@desc Get a specific CATEGORY by ID
//@route GET /api/category/:id
//@access public


const get_category = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
        res.status(404);
        throw new Error("Category not found");
    }

    res.status(200).json(category);
});



//=============================== CATEGORY GET SPECIFIC CATEGORY API ========================================



//@desc Get a specific CATEGORY by ID
//@route GET /api/categories
//@access public


const get_categories = expressAsyncHandler(async (req, res) => {

    const category = await Category.find({});
    if (category.length === 0) {
        res.status(404);
        throw new Error("Category not found");
    }

    res.status(200).json(category);
});



//=============================== CATEGORY DELETE API ========================================


//@desc Delete a CATEGORY by ID
//@route DELETE /api/category/:id
//@access public


const deletee = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
        res.status(404);
        throw new Error("Category not found");
    }

    await Category.deleteOne({ _id: id });
    res.status(200).json({ message: "Category deleted successfully" , category});
});


module.exports = { create, update, get_category, get_categories, deletee };