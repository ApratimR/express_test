const express = require('express')
const {generate_body} = require('../../common/functions.js')
const {http_status_code} = require('../../common/constants.js')
const jwt = require('jsonwebtoken')
const public_middleware = require('./middleware.js')
const { User } = require('../../db/schema/user.schema.js')
const { logger } = require('../../common/logger.js')
const { NotFoundError } = require('../../errors/errors.js')
const { generateSessionToken } = require('../../security/functions.js')

const public_router = express.Router()

// using middleware specific to public routes
public_router.use(express.json())
public_router.use(public_middleware)

public_router.post('/hello',async (req,res) => {
    try{throw new Error("SOMETHINGWRONG");
    }
    catch(err){
        return generate_body(res,500,http_status_code[500])
    }
})

public_router.post('/signin',async(req,res)=>{
    try{
        const payload = {
            user : 'test',
            rolse : 'user'
        }

        let usertoken = jwt.sign(payload,process.env.JWT_SECRET,{algorithm:'HS512',expiresIn:'1m'})

        let response_body = {
            tokne : usertoken
        }

        return generate_body(res,200,http_status_code[200],response_body)

    }catch{
        return generate_body(res,500,http_status_code[500])
    }
})

public_router.post("/logger",async(req,res,next)=>{
    try{
        throw new NotFoundError("Something Else");
        
        return generate_body(res,200,http_status_code[200])
    }
    catch(err){
        next(err)
    }
})

public_router.post("/create",async(req,res)=>{
    try{
        const newUser = new User(req.body)
        await newUser.save()
        return generate_body(res,200,http_status_code[200])
    }
    catch(err){
        console.log(err)
        return generate_body(res,500,http_status_code[500])
    }
})

public_router.post("/read",async(req,res)=>{
    try{

        const data = await User.find()
        return generate_body(res,200,http_status_code[200],data)
    }
    catch(err){
        console.log(err)
        return generate_body(res,500,http_status_code[500])
    }
})

public_router.post("/session-generate",async(req,res)=>{
    try{
        const user = req.body.name
        const session = await generateSessionToken()

        await req.app.locals.cache.set(user,session,{EX:10})

        return generate_body(res,200,http_status_code[200],session)
    }
    catch(err){
        console.log(err)
        return generate_body(res,500,http_status_code[500])
    }
})


public_router.post("/session-get",async(req,res)=>{
    try{
        const user = req.body.name
        const session = await req.app.locals.cache.get(user)
        return generate_body(res,200,http_status_code[200],session)
    }
    catch(err){
        console.log(err)
        return generate_body(res,500,http_status_code[500])
    }
})

module.exports = public_router