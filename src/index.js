const express = require('express')
const private_router = require('../src/routers/private/router')
const public_router = require('../src/routers/public/router')

const app = express()

const PORT = process.env.PORT || '3000'


// attaching routers
// app.use(express.json())
app.use('/private',private_router)
app.use('/public',public_router)


// starting the server
app.listen(PORT,()=>{
    console.log(`application running on PORT ${PORT}`);
})