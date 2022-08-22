
const router = require("express").Router();
const User = require("../models/User");
const dbconnhection = require("../database/dbConnect");


router.post("/", async (req, res) =>{

    const{email, password, checkpassword} = req.body;

    if(!email){
        res.status(422).json({error: "Email is requerid"})
    }else if(!password){
        res.status(422).json({error: "Password is requerid"})
    }else if(!checkpassword){
        res.status(422).json({error: "Password Check field is requerid"})

    }else{
        const user = {
            email,
            password,
            checkpassword
        }
        try{
            if(password === checkpassword){                      
            dbconnhection();
            await User.create(user);
            console.log("To Post New User");
            res.status(200).json({message: "User Registered"})            
            }else{
                res.status(422).json({error: "Password are diferent."})
            }
        }catch(error){
            console.log(" Ocurred and error" + error); 
            return res.status(500).json({error:"Register Failed."})}
        }
});

module.exports = router;