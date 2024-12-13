const express = require("express");
const { create, update, deletee, get_user, get_users } = require("../controller/user_controller");


const router = express.Router();


router.post("/user", create);
router.put("/user/:id", update);
router.delete("/user/:id", deletee);
router.get("/user/:id", get_user);
router.get("/users", get_users);



module.exports = router;