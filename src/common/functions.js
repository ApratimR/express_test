const { randomBytes } = require('crypto');


/**\
 * @param {import("express").Response} res 
 */
async function generate_body(res,statusCode=200,message='OK',data = '') {
    const response = {
        status: statusCode,
        success: statusCode >= 200 && statusCode < 300, // Success for 2xx status codes
        message: message,
        data: data
    };
    return res.status(statusCode).json(response)
}


module.exports = {generate_body}