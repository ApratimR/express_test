const {createClient} = require("redis");
const { logger } = require("../common/logger");

async function getCacheConnection(){
    const client = createClient({
        url:"redis://default:admin@localhost:6379"
    });

    client.on("error",(err)=>{
        logger.error("Redis Cache Not Available",err)
        process.exit(1)
    })
    
    
    return client
}


module.exports = {getCacheConnection}