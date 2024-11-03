/**
 * 
 * @param {import("express").Response} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
async function public_middleware(req,res,next){
    const start = Date.now(); // Capture the start time
    
    // Event listener for when the response has finished
    res.on('finish', () => {
        const duration = Date.now() - start; // Calculate the time difference
        console.log(`Request to ${req.url} took ${duration}ms`);
    });
    
    next(); // Pass control to the next middleware/route handler
}

module.exports = public_middleware