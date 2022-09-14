//Importing Express / REQ, RES
const express = require("express"); //importing express
const app = express(); // instancing express

//Importing dependencies to configurate server
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser')

//Configurating Server
app.use(cors());
app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Importing moongose /Server
const moongose = require("mongoose");
//Running Server
app.listen(8000);
app.get("/",(req, res) => {       
       return res.json({message: "Server Running"})
});

//Routes

//Register user
const userRegister = require("./controller/authController");
app.use("/userauth/", userRegister);

//Login
const userLogin = require ("./controller/authController");
app.use("/userauth/", userLogin);

//Search User
const userID = require ("./controller/authController");
app.use("/userauth/", userID);

//Delete User
const userDelete = require("./controller/authController");
app.use("/userauth", userDelete);

//Put - Updating Users Info
const userPut = require("./controller/authController")
app.use("/userauth", userPut);

//Getting crypto currences
const getcryptos = require("./routes/coinGeckApiRoute");
app.use("/getcryptos", getcryptos)


