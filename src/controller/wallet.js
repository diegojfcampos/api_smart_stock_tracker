const router = require("express").Router();
const User = require("../models/User");
const dbconnhection = require("../database/dbConnect");

router.post("/buy", async (req, res) => {    
    const { id, currency, name, value, amount, tax, date } = req.body
    let total = (value * amount);
    const cryptoToadd = { currency, name, value, amount, total, tax, date }
    

    
    try {
        dbconnhection();

        const userToAdd = await User.findOne({ _id: id });
        
        await userToAdd.updateOne({ $push: { wallet: cryptoToadd } });        
        console.log("Adding Currency into the wallet");
        res.status(200).json({ message: "Inserted" });
    } catch (error) { res.status(400).json({ msg: error }) }
});

router.post("/insert", async (req, res) => {    
    const { id, currency, name, quantitie, totalDays, rate, rescueDate } = req.body    
    const stackToadd = { currency, name, quantitie, totalDays, rate, rescueDate}
    const nameCrypto = req.body.name

    
    try {
        dbconnhection();

        const userToAdd = await User.findOne({ _id: id });
        
        await userToAdd.updateOne({ $push: { stack: cryptoToadd } });        
        console.log("Adding Currency into the wallet");
        res.status(200).json({ message: "Inserted" });
    } catch (error) { res.status(400).json({ msg: error }) }
});

router.post("/getwallet", async (req, res) => {
    const userId = req.body.id;     
    
    try {
        dbconnhection();
        const userIdWalltet = await User.findOne({ _id: userId });
        
        const walletArray = userIdWalltet["wallet"];  
        console.log("Wallet Sent")
        res.status(200).json( walletArray );        

    } catch (error) { res.json({ msg: "Error to find a wallet" }) }
});

router.post('/totalinvested', async(req,res) =>{
    const userId = req.body.id;    
    let totalInvested = 0;

    try{        
        dbconnhection();
        const userIdTot = await User.findOne({ _id: userId });        
        const walletArray = userIdTot["wallet"];        
                
        for (var i = 0; i < walletArray.length; i++) {             
            totalInvested += walletArray[i].total;              
        }
        res.status(200).json(totalInvested);
    }catch (error) { res.json({ msg: "Error to get the total invested" }) }

})

router.post('/totaltax', async(req,res) =>{
    const userId = req.body.id;    
    let totalTax = 0;

    try{        
        dbconnhection();
        const userIdTot = await User.findOne({ _id: userId });        
        const walletArray = userIdTot["wallet"];        
                
        for (var i = 0; i < walletArray.length; i++) {             
            totalTax += walletArray[i].tax;              
        }
        res.status(200).json(totalTax);
    }catch (error) { res.json({ msg: "Error to get the total invested" }) }

})

module.exports = router;