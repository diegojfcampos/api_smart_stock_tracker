//Importing Express / REQ, RES
const express = require("express"); //importing express
const req = require("express/lib/request");
const app = express(); // instancing express
const dotenv = require('dotenv').config();

//Creating server and Allowing Json
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Importing mongodb / DB
const { Db } = require("mongodb");

//Importing moongose /Server
const moongose = require("mongoose");
//Running Server
app.listen(8000);
app.get("/",(req, res) => {       
       return res.json({message: "Server Running"})
});

//Routes
//Register
const userRegister = require("./controller/authController");
app.use("/userauth/", userRegister);

//Login
const userLogin = require ("./controller/authController");
app.use("/userauth/", userLogin);

const userID = require ("./controller/authController");
app.use("/userauth/", userID);