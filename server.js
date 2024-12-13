const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/dbConnection");
const errorHandler = require("./middleware/error_handler");
const path = require('path');



const app = express();
const port = process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./route/user"));
app.use("/api", require("./route/category"));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', require("./route/brand"));

app.use('/uploads/Products', express.static(path.join(__dirname, 'uploads/Products')));
app.use('/api', require("./route/product"));



app.use(errorHandler);
connectDB();

app.listen(port, () =>{
    console.log(`App is running on the port ${port}`);
});