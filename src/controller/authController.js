
//Imports

const router = require("express").Router();
const User = require("../models/User");
const dbconnhection = require("../database/dbConnect");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dbConnect = require("../database/dbConnect");
const dotenv = require("dotenv").config();



//Route signup / register
router.post("/register", async (req, res) =>{
    const{email, password, checkpassword} = req.body;

    //Validations
    if(!email){
        res.status(422).json({error: "Email is requerid"})
    }else if(!password){
        res.status(422).json({error: "Password is requerid"})
    }else if(!checkpassword){
        res.status(422).json({error: "Password Check field is requerid"})

    }else{
        //hashing passwords using "bcryptojs" before save on database
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);
        const checkpasswordHash = await bcrypt.hash(checkpassword, salt);
        
        //Instantiating user object by mongooser schema
        const user = new User({
            email,
            password: passwordHash            
        });

        //Registering
        try{
            //Connecting MongoDB
            dbconnhection();    
            //Searching for user instance in the Database
            const checkemail =  await User.findOne({email: email});
            if(checkemail){                
                return res.status(500).json({message: "User already registered, use another e-mail or sign in."});}
            else{       
                //Validating password
                if(user.password === checkpasswordHash){   

                    //Registering User           
                    await User.create(user);           
                    console.log("To Post New User");
                    res.status(200).json({message: "User Registered"})            
                }else{
                    res.status(422).json({error: "Passwords are diferent."})
                }
            }
        }catch(error){
            console.log("Ocurred an error" + error);
            res.status(500).json({error: error + " Register Failed."});}
    }           
       
});

//Route SignIn / Log in

router.post("/login", async (req, res) => {
    const {email, password} = req.body;

    if(!email){       
        return res.status(500).json({message: "Email is required"})
    }else if(!password){
        return res.status(500).json({message: "Password is required"})
    }else{            
        try{
            dbconnhection();    
            const user = await User.findOne({email: email});
            console.log(user);
            if(!user){                
                res.status(404).json({message: "User not found"})
                console.log(typeof(checkPassword), checkPassword);
                console.log(password, user.password)
            }else{            
                const checkPassword = await bcrypt.compare(password, user.password);
                if(!checkPassword){
                    res.status(404).json({message: "Wrong password"})
                }else{
                    const secret = process.env.secret;
                    const token = jwt.sign({id: user._id},secret);
                    return res.status(200).json({user, Token: token})
                }                
            }     
        }catch(error){
            console.log("Error fields validation" + error);
            return res.status(501).json({message: "Log in failed"})
        }
    }
})

//Route Private

function checkToken(req, res, next){
    
    const authHeader = req.authHeaders["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({message: "Access Denied"});
    }else{
        try{

            const secret = process.env.secret;
            jwt.verify(token, secret);
            next();

        }catch(error){ return res.status(404).json({message: "Invalid TOKEN"})}
    }
}

router.get("/:id",checkToken, async (req, res) =>{
    const id = req.params.id
    try{ 
        dbconnhection();
        const userId = await User.findById(id, "-password");
        console.log(userId);
        if(!userId){
            res.status(404).json("User not found");
        }else{
            res.status(200).json({message: "User found", userId});
        }

    }catch(error){
        return res.status(501).json({message: "Access Denied"})
    }

})

router.delete("/userdelete/", async (req,res)=>{

    const {email, password} = req.body;

    if(!email){
        res.status(404).json({message: "Email is require"})
    }else if(!password){
        res.status(404).json({message: "Password is require"})
    }else{
        try{
            dbconnhection();
            const userToDelet = await User.findOne({email: email});
            
            if(!userToDelet){
                res.status(404).json({message: "User not found"})
            }else{
                const checkPassword = await bcrypt.compare(password, userToDelet.password)                
                if(!checkPassword){
                    res.status(404).json({message: "Access Deied"})
                }else{
                    await User.remove(userToDelet)
                    return res.status(202).json({message: "User Deleted"});
                }
            }        
        }catch(error){
        res.status(404).json({message: "Process Denied"})
        }
    }
});

router.put("/userinfoupdate", async(req, res) => {
    const {email, password, newpassword} = req.body

    try{
        if(!email){
            res.status(400).json({message: "Email is required"})
        }else if(!password){
            res.status(400).json({message: "Password required"})
        }else if(!newpassword){
            res.status(400).json({message: "New Password is required"});
        }else{            
            dbconnhection();
            const userToUpdate = await User.findOne({email: email});            
            const passwordChecking = await bcrypt.compare(password, userToUpdate.password);         

            if(!passwordChecking){                
                res.status(400).json({message: "Wrong Password"})
            }else{
               
                const salt = await bcrypt.genSalt(12)
                const newPasswordHash = await bcrypt.hash(newpassword, salt);
                await User.updateOne({email: newPasswordHash});                
                res.status(200).json({message: "Password Updated"});
            }        
        }
    }catch(error){
        res.status(404).json({message: "Update failed"});
    }       
});

module.exports = router;

