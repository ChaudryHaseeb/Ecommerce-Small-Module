const express = require('express');
const { create, update, deletee, get_variant, get_variants } = require('../controller/variant_controller');


const router = express.Router();

router.post('/product/:id/variant', create);
router.put("/product/:id/variant/:id", update);
router.get("/product/:id/variant/:id", get_variant);
router.get("/product/:id/variants", get_variants);
router.delete("/product/:id/variant/:id", deletee);


module.exports = router;