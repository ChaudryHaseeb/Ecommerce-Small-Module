const express = require("express");
const { create, update, deletee, get_category, get_categories } = require("../controller/category_controller");


const router = express.Router();


router.post("/category", create);
router.put("/category/:id", update);
router.get("/category/:id", get_category);
router.get("/categories", get_categories);
router.delete("/category/:id", deletee);



module.exports = router;