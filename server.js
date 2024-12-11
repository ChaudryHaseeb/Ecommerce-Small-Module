const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/dbConnection");
const errorHandler = require("./middleware/error_handler");


const app = express();
const port = process.env.PORT || 5000;


app.use(express.json());







app.use(errorHandler);
connectDB();

app.listen(port, () =>{
    console.log(`App is running on the port ${port}`);
});