const express = require('express');
const { create, update, deletee, get_product, get_products, get_product_brand, get_product_category } = require('../controller/product_controller');
const Upppload = require('../middleware/Upppload');


const router = express.Router();

router.post('/product', Upppload.single('logo'), create);
router.put("/product/:id", Upppload.single('logo'), update);
router.get("/product/:id", get_product);
router.get("/product/brand/:id", get_product_brand);
router.get("/product/category/:id", get_product_category);
router.get("/products", get_products);
router.delete("/product/:id", deletee);


module.exports = router;