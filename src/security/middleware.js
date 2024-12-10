const { http_status_code } = require("../common/constants");
const { generate_body } = require("../common/functions");
const jwt = require("jsonwebtoken")

/**
 * 
 * @param {import("express").Response} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
async function private_jwt_middleware(req,res,next){
    let authtoken = req.headers['authorization'];

    if (!authtoken){
        return generate_body(res,400,http_status_code[400],"Token Not Found")
    }

    jwt.verify(authtoken,process.env.JWT_SECRET,(err,token)=>{
        if(err){
            return generate_body(res,403,http_status_code[403])
        }

        next()
    })
}

module.exports =  {private_jwt_middleware};