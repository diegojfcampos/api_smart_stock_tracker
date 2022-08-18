//Importing Express
const express = require("express"); //importing express
const req = require("express/lib/request");
const app = express(); // instancing express
const dotenv = require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Importing mongodb
const { Db } = require("mongodb");

//Importing CoinGecko API
const CoinGecko = require('coingecko-api');

const CoinGeckoClient = new CoinGecko();
var func = async() => {
  let data = await CoinGeckoClient.ping();
  let coins = await CoinGeckoClient.coins.markets(price, volume);
};



//Importing moongose
const moongose = require("mongoose");

//Creating server and Allowing Json

app.listen(8000);


//Connecting DB from mudele




//Generating server nodemon
app.get("/",(req, res) => {       
       return res.json({message: "Server Running"})
});

//Routes
const UserSignupRoutes = require("./routes/signup")
app.use("/signup", UserSignupRoutes);

