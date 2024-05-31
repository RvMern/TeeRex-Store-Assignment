const express = require('express');
const errorMiddleware = require('./Middlewares/errorMiddleware');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000
const HOSTNAME = process.env.HOSTNAME || '127.0.0.1'
require('./Config/dbConnect');
const cors = require('cors');
const userRouter = require('./Routes/userRoute')
const productRouter = require('./Routes/productRoute')

// ! Global Middlewares
app.use(express.json());
app.use(cors({
    origin:['http://localhost:5173']
}));


// ! Routers
app.use('/api/v1/user',userRouter)
app.use('/api/v1/product',productRouter)



// ! Error Handler
app.use(errorMiddleware)





app.listen(PORT,HOSTNAME,()=>{
    console.log(`Server is running successfully on ${HOSTNAME}:${PORT}`);
})