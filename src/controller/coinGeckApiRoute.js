//Importing express.router();
const router = require("express").Router();
//Importing Axios
const axios = require("axios");

const urlGetCoinsUSD = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C%2024h%2C%207d%2C%2014d%2C%2030d%2C%20200d%2C%201y";
const urlGetCoinsEUR = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C%2024h%2C%207d%2C%2014d%2C%2030d%2C%20200d%2C%201y"
const urlGetCoinsBTC = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=btc&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C%2024h%2C%207d%2C%2014d%2C%2030d%2C%20200d%2C%201y";


//Getting coins quotation in USD
router.get("/usd", async(req, res) =>{

        try{
        const response = await axios.get(urlGetCoinsUSD);       
        console.log("Returning a json file with details of 100 crypto stocks in USD currency");
        
        return res.status(200).json(response.data);

        }catch(error){ res.status(404).json({msg: "Error to access currencys."})};
})

//Getting coins quotation in EUR
router.get("/eur", async(req, res) =>{

    try{
    const response = await axios.get(urlGetCoinsEUR);    
    console.log("Returning a json file with details of 100 crypto stocks in EUR currency");
    return res.status(200).json(response.data);

    }catch(error){ res.status(404).json({msg: "Error to access currencys."})};
})

//Getting coins quotation in BTC
router.get("/btc", async(req, res) =>{
    
    try{
        const response = await axios.get(urlGetCoinsBTC);
        //console.log(req.headers)
        console.log("Returning a json file with details of 100 crypto stocks in BTC currency");
        return res.status(200).json(response.data);
    
        }catch(error){ res.status(404).json({msg: "Error to access currencys."})};
})

//Filtered Datas

//Getting coins quotation in USD
router.get("/btcfilter", async(req, res) =>{

    try{
        const response = await axios.get(urlGetCoinsBTC);
        const data = response.data
        const filterData = []

        for(let user in data){
            const coinRank = data[user].market_cap_rank;
            const coinImg = data[user].image;
            const coinId = data[user].id;
            const coinName = data[user].name;
            const coinPrice = data[user].current_price;
            const coin24Change = data[user].price_change_percentage_24h;
            const coinCap = data[user].market_cap;
            const coinVolume = data[user].total_volume;

            filterData.push({coinRank, coinName, coinPrice, coin24Change, coinCap, coinVolume});
        }
        return res.status(200).json(filterData)
    }catch(error){ res.status(404).json({msg: "Error to access currencys."})};
});

router.get("/:id", async(req, res) => {
    try{
        const id = req.params.id
        url = `https://api.coingecko.com/api/v3/coins/${id}`;
        const response = await axios.get(url)
        console.data("Getting Currency by ID");
        return res.status(200).json(response.data)
    }catch(error){res.status(400).json({message: "Erro to get currency"})}
});

module.exports = router;