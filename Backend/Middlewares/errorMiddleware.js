const errorMiddleware = (err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    const stack = err.stack || null

    res.status(statusCode).json({
        isError:true,
        message,
        stack
    })
}



module.exports = errorMiddleware