const express = require('express')
const {generate_body} = require('../../common/functions.js')
const {http_status_code} = require('../../common/constants.js')
const public_middleware = require('./middleware.js')

const public_router = express.Router()

// using middleware specific to public routes
public_router.use(public_middleware)

public_router.post('/hello',async (req,res) => {
    try{throw new Error("SOMETHINGWRONG");
    }
    catch(err){
        return generate_body(res,500,http_status_code[500])
    }
})

module.exports = public_router