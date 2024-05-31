const appError = require("../Utils/appError");
const JWT = require('jsonwebtoken');

const isLoggedIn = (req,res,next) => {
    const bearerToken = req.headers.authorization;
    if(!bearerToken){
        return next(appError(500,'Please login first!'))
    }
    const token = bearerToken?.split(' ')[1]
    if(!token){
        return next(appError(500,'Token has been expired. Login to continue!'))
    }
    const user = JWT.verify(token,process.env.JWT_SECRET)
    if(!user){
        return next(appError(500,'Token has been expired. Login to continue!'))
    }
    req.user = user;
    next();

}



module.exports = isLoggedIn