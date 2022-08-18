
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const dbConnect = async() => {
    await mongoose.connect(
        `mongodb+srv://diegojfcampos:${process.env.mongoDB_password}@cluster0.uvzqwgp.mongodb.net/smart_stock_tracker?retryWrites=true&w=majority`, 
        (error) => {
            if(error){
                return console.log("Connection Failed", error);
        }else{console.log("MongoDB Connected");}       

        }
    );
};

module.exports = dbConnect;



//const {MongoClient} = require("mongodb");

/**
async function dbConnect(){     
    const client = new MongoClient(`mongodb+srv://diegojfcampos:${process.env.mongoDB_password}@cluster0.uvzqwgp.mongodb.net/smart_stock_tracker?retryWrites=true&w=majority`);

    try{
        await client.connect();
        console.log("MongoDB Connected");
        //await listDatabases(client);

    }catch(err){
        console.error(err);
        console.log("MongoDB Connection Failed");
    }finally{
        await client.close();
    }
}

dbConnect().catch(console.error);
module.exports = dbConnect();
 */