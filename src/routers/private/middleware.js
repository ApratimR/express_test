const { http_status_code } = require("../../common/constants");
const { generate_body } = require("../../common/functions");

/**
 * 
 * @param {import("express").Response} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
async function private_middleware(req,res,next){
    const authHeader = req.headers['authorization'];

    if(authHeader){
        if(authHeader != "1234"){
            return generate_body(res,401,http_status_code[401])
        }
    }else{
        return generate_body(res,400,http_status_code[400])
    }
    
    next(); // Pass control to the next middleware/route handler
}

module.exports =  private_middleware;