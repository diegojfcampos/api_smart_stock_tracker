const express = require("express");
const User = require("./model/user");
const router = express.Router();

router.post("/register", async (req,res) => {
    try{
        const user = await User.create(req.body);
    }catch(err){
        return res.status(400).send({error: "Registration Field / Controller"})
    }
});