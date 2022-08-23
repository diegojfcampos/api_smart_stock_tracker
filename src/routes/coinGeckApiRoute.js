//Importing express.router();
const router = require("express").Router();
//Importing Axios
const axios = require("axios");



const urlGetCoinsUSD = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C%2024h%2C%2030d%2C%20200d%2C%201y";
const urlGetCoinsEUR = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y"
const urlGetCoinsBTC = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=btc&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y";


//Getting coins quotation in USD
router.get("/usd", async(req, res) =>{

        try{
        const response = await axios.get(urlGetCoinsUSD);
        return res.status(200).json(response.data);

        }catch(error){ res.status(404).json({msg: "Error to access currencys."})};
})

//Getting coins quotation in EUR
router.get("/eur", async(req, res) =>{

    try{
    const response = await axios.get(urlGetCoinsEUR);
    return res.status(200).json(response.data);

    }catch(error){ res.status(404).json({msg: "Error to access currencys."})};
})

//Getting coins quotation in BTC
router.get("/btc", async(req, res) =>{

    try{
    const response = await axios.get(urlGetCoinsBTC);
    return res.status(200).json(response.data);

    }catch(error){ res.status(404).json({msg: "Error to access currencys."})};
})



module.exports = router;