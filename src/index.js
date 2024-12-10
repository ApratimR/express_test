const express = require('express')
const private_router = require('../src/routers/private/router')
const public_router = require('../src/routers/public/router')
const {testDBConnection, getDBConnection} = require('../src/db/connection')
const { getCacheConnection } = require('./cache/connection')
const errorHandlerMiddleware = require('./errors/middleware')


async function startServer() {
    console.log("Starting Server")

    const app = express()
    const PORT = process.env.PORT || '3000'

    // test DB connection
    let dbStatus = await testDBConnection()
    if (!dbStatus){
        console.log("DB Connection failed. Closing the Process")
        process.exit(1)
    }

    const dbConnection = await getDBConnection()

    app.locals.db = dbConnection

    const cacheConnection = await getCacheConnection()
    await cacheConnection.connect()

    app.locals.cache = cacheConnection

    //===============Routers================= 
    app.use('/private',private_router)
    app.use('/public',public_router)
    //===============Routers=================
    
    app.use(errorHandlerMiddleware)

    // starting the server
    app.listen(PORT,()=>{
        console.log(`server running on port ${PORT}`);
    })
}

startServer()