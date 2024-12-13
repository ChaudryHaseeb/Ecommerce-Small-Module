const expressAsyncHandler = require("express-async-handler");
const Order = require("../model/Order");
const Product = require("../model/Product");



//=============================== CREATE ORDER API ========================================

//@des Create an Order
//@routes POST api/order
//@access public

const create = expressAsyncHandler(async (req, res) => {
  const { user_id, products } = req.body;

  if (!user_id || !Array.isArray(products) || products.length === 0) {
    res.status(400);
    throw new Error("User ID and products array are required.");
  }

  let totalAmount = 0;
  const populatedProducts = [];

  for (const item of products) {
    const { product_id, quantity } = item;

    if (!product_id || !quantity) {
      res.status(400);
      throw new Error("Product ID and quantity are mandatory for each item.");
    }

    const product = await Product.findById(product_id).select("name price");
    if (!product) {
      res.status(404);
      throw new Error(`Product with ID ${product_id} not found.`);
    }

    totalAmount += product.price * quantity;

    populatedProducts.push({
      product_id,
      quantity,
      name: product.name,
      price: product.price,
    });
  }

  const order = await Order.create({
    user_id,
    products: populatedProducts,
    totalAmount,
  });

  res.status(201).json({ message: "Order created successfully!", order });
});



//=============================== ORDER GET SPECIFIC ORDER API ========================================

//@des Get Orders for specific user
//@routes GET api/orders
//@access public

const get_orders = expressAsyncHandler(async (req, res) => {
    console.log("!!!!!!!!!!");
    const {user_id} = req.body;
    console.log("$$$$$$$$$$$", user_id);
    console.log("%%%%%%%%%%", req.body);
    if(!user_id){
        res.status(400);
        throw new Error("User id is required.");
    }
    const orders = await Order.find({user_id});
    console.log("&&&&&&&&&",orders)

    if (!orders || orders.length === 0) {
      res.status(400);
      throw new Error("No Order Found for this user.");
    }

    res.status(201).json( orders );
});




//=============================== ORDER GET All ORDER API ========================================

//@des Get Order
//@routes GET api/order/:id
//@access public

const get_order = expressAsyncHandler(async (req, res) => {
    const {id} = req.params;
    console.log("$$$$$$$$$$$",id);
    console.log("%%%%%%%%%%", req.params);
    if(!id){
        res.status(400);
        throw new Error("Order id is required.");
    }
    const orders = await Order.findById(id);
    console.log("&&&&&&&&&",orders)

    if (!orders || orders.length === 0) {
      res.status(400);
      throw new Error("No Order Found for this user.");
    }

    res.status(201).json( orders );
});



//=============================== CANCEL ORDER API ========================================

//@desc Cancel Order
//@route PUT api/order/cancel/:id
//@access public

const cancel = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        res.status(400);
        throw new Error("Order id is required.");
    }

    const order = await Order.findById(id);

    if (!order) {
        res.status(404);
        throw new Error("Order not found.");
    }

    if (order.status === 'cancelled') {
        res.status(400);
        throw new Error("Order is already cancelled.");
    }

    order.status = 'Cancelled';
    await order.save();

    res.status(200).json({ message: "Order has been cancelled.", order });
});

module.exports = { create, get_orders, get_order,cancel };
