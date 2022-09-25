const router = require("express").Router();
const User = require("../models/User");
const dbconnhection = require("../database/dbConnect");


router.post("/:id/buy", async (req, res) => {
    const useriD = req.params.id
    const {currency, name, value, amount,tax, date} = req.body
    const cryptoToadd = {currency, name, value, amount,tax, date}    

    try{
        dbconnhection();
        
        const userToAdd = await User.findOne({_id: useriD});
        
        await userToAdd.updateOne({$push: {wallet: cryptoToadd}});

        res.status(200).json({message: "Inserido"});
    }catch(error){res.status(400).json({msg: error})}
});

router.delete


module.exports = router;