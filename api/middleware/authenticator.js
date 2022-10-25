const Token = require("../models/Token")

function authenticator(req, res, next) {

    try{
        const userCookie = req.cookies.discretionUser;
        
        if(!userCookie) {
            throw new Error("User not authenticated.")
        } else {
            const isTokenValid = Token.getOneByToken(userCookie)
            next();

        }
    } catch(err) {
        res.status(403).json({error: err.message})
    }
    console.log(req.cookies)
}


module.exports = authenticator;
