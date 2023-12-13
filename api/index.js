const fastify = require("fastify")({logger: true})
const fastifyEnv = require('@fastify/env')
const dbOptions = require("../src/database/dbOptions")

async function start(){
       try{
         //Registering Cors
         fastify.register(require("@fastify/cors",{origin: "*"}))
         fastify.log.info("Cors registered")

         //Registesring @fastify/env
         await fastify.register(fastifyEnv, dbOptions)
         //Registering MongoDB


         await fastify.listen({port: 3000})
         fastify.log.info(`Server running on ${fastify.server.address().port}`)

       }catch(err){
          fastify.log.error(err)
          process.exit(1)
       }
}
start()
//Importing Express / REQ, RES
const express = require("express"); //importing express
const app = express(); // instancing expressS

//Importing dependencies to configurate server
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser')

//Configurating Server
app.use(cors());
app.use(express.json());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

//Importing moongose /Server
const moongose = require("mongoose");
//Running Server
app.listen(8000);
app.get("/", (req, res) => {
       console.log("Server running");
       return res.status(200).json({ message: "Server Running" })
});

//Routes

//Register user
const userRegister = require("../src/controller/authController");
app.use("/api/userauth/", userRegister);

//Login
const userLogin = require("../src/controller/authController");
app.use("/api/userauth/", userLogin);

//Search User
const userID = require("../src/controller/authController");
app.use("/api/userauth/", userID);

//Delete User
const userDelete = require("../src/controller/authController");
app.use("/api/userauth/", userDelete);

//Put - Updating Users Info
const userPut = require("../src/controller/authController")
app.use("/api/userauth/", userPut);

//Getting crypto currences
const getcryptos = require("../src/controller/coinGeckApiRoute");
app.use("/api/getcryptos/", getcryptos);

const addInWallet = require("../src/controller/wallet")
app.use("/api/wallet/", addInWallet);

const getWallet = require("../src/controller/wallet");

app.use("/api/wallet", getWallet);


