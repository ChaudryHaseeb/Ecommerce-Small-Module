const expressAsyncHandler = require("express-async-handler");
const User = require("../model/User");
const bcrypt= require("bcryptjs")




//=============================== USER CREATE API ========================================


//@des create a user
//@routes POST api/user
//@access public


const create = expressAsyncHandler(async (req, res) => {
    const { name, email, password, age, country } = req.body;
    if (!name || !email || !password ||!age ||!country) {
      res.status(400);
      throw new Error("All fields are mandatory");
    };

    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
      res.status(400);
      throw new Error("User already registered");
    };

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
     age,
    country
    });
    res.status(200).json({message: "User registered!", user});

})



//=============================== USER UPDATE API ========================================


//@desc Update a user by ID
//@route PUT /api/user/:id
//@access public


const update = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, email, age, country, password } = req.body;

    const user = await User.findById(id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    if (name , email, age, country, password){
        user.name = name;
        user.email = email;
        user.age = age;
        user.country = country;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

    }

    const updatedUser = await user.save();
    res.status(200).json({ message: "User updated successfully", updatedUser });
});



//=============================== USER DELETE API ========================================


//@desc Delete a user by ID
//@route DELETE /api/user/:id
//@access public


const deletee = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    await User.deleteOne({ _id: id });
    res.status(200).json({ message: "User deleted successfully" });
});



//=============================== USER GET SPECIFIC USER API ========================================



//@desc Get a specific user by ID
//@route GET /api/user/:id
//@access public


const get_user = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    res.status(200).json(user);
});


//=============================== USER ALL USER API ========================================


//@desc Get all users
//@route GET /api/users
//@access public


const get_users = expressAsyncHandler(async (req, res) => {
    const users = await User.find().select("-password");

    res.status(200).json(users);
});


module.exports = { create, update, deletee, get_user, get_users };