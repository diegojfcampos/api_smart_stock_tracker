const {MongoClient} = require("mongodb");
const moongose = require("mongoose");


async function dbConnect(){
    const url = "mongodb+srv://diegojfcampos:admin123@cluster0.uvzqwgp.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url);

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

/** 
async function listDatabases(client){
    const databaseslist = await client.db().admin().listDatabases();
    
    console.log("Databases:");
    databaseslist.databases.forEach(db => {
        console.log(`- ${db.name}`);        
    });
}
 


const dbConnection = moongose.connect(
    `${main().url}`    
).then(() => {
    console.log("MongoDb Connected")
}).catch((err) => console.log("MondoDB Connection Failed"))
**/

module.exports = dbConnect;