const express = require('express');
const { create, update, deletee, get_brand, get_brands } = require('../controller/brand_controller');
const upload = require('../middleware/upload');


const router = express.Router();

router.post('/brand', upload.single('logo'), create);
router.put("/brand/:id", upload.single('logo'), update);
router.get("/brand/:id", get_brand);
router.get("/brands", get_brands);
router.delete("/brand/:id", deletee);



module.exports = router;