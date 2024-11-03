const express = require('express')
const {generate_body} = require('../../common/functions.js')
const {http_status_code} = require('../../common/constants.js')
const private_middleware = require('./middleware.js');

const private_router = express.Router()

private_router.use(express.json())

// Use middleware specific to private routes
private_router.use(private_middleware);

private_router.post('/hello',async (req,res) => {
    try{
        console.log(req.body)
        return generate_body(res,200,http_status_code[200],{"hello":"world"})
    }
    catch(err){
        return generate_body(res,500,http_status_code[500])
    }
})

module.exports = private_router