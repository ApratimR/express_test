const express = require('express')
const {generate_body} = require('../../common/functions.js')
const {http_status_code} = require('../../common/constants.js')
const { private_jwt_middleware } = require('../../security/middleware.js')

const private_router = express.Router()

private_router.use(express.json())

// Using middleware specific to private routes
private_router.use(private_jwt_middleware)

private_router.post('/hello',async (req,res) => {
    try{
        return generate_body(res,200,http_status_code[200],{"hello":"world"})
    }
    catch(err){
        return generate_body(res,500,http_status_code[500])
    }
})

module.exports = private_router