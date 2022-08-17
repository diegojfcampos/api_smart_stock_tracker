
//Importing Express
const express = require("express"); //importing express
const req = require("express/lib/request");
const app = express(); // instancing express


app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Importing CoinGecko API
const CoinGecko = require('coingecko-api');
const { Db } = require("mongodb");
const CoinGeckoClient = new CoinGecko();
var func = async() => {
  let data = await CoinGeckoClient.ping();
};

//Importing moongose
const moongose = require("mongoose");

//Creating server and Allowing Json
app.use(express.json());
app.listen(8000);

//Connecting DB from mudele

const mongo = require("./database/dbConnect")


//Generating server nodemon
app.get("/",(req, res) => {
    return res.json({message: "Server Running"})
});


