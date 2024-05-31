const appError = require("../Utils/appError")
const Product = require("../Models/productModel")

const createProduct = async(req,res,next) => {
    try{
        const {name,description,image,price,shirtColor, tag, shirtType, stock} = req.body;
        if(name === "" || description === "" || image === "" || price === "", stock === ""){
            return next(appError(400,'All fields are required'));
        }
        
        await Product.create({
            name,
            description,
            image,
            price,
            shirtColor,
            tag,
            shirtType,
            stock
        })
        res.status(200).json({
            success:true,
            message:"New Product Has been generated successfully"
        })
    }
    catch(err){
        next(appError(500,err.message))
    }
}

const getAllProducts = async(req,res,next) => {
    try{
        const { search, color, type, price, gender } = req.body;
        let minPrice = 0;
        let maxPrice = 0;
        let query = {};

        if (search !== '') {
            // Adding search condition to search in name, color, and type fields
            query.$or = [
                { name: { $regex: search, $options: 'i' } }, // Case-insensitive search in name
                { color: { $regex: search, $options: 'i' } }, // Case-insensitive search in color
                { type: { $regex: search, $options: 'i' } } // Case-insensitive search in type
            ];
        }
        
        if (color !== '') {
            query.shirtColor = color;
        }
        if (type !== '') {
            query.shirtType = type;
        }
        if (price !== '') {
            const priceArray = price.split('-');
            minPrice = parseInt(priceArray[0]);
            maxPrice = parseInt(priceArray[1]);
            query.price = { $gte: minPrice, $lte: maxPrice };
        }
        if (gender !== '') {
            query.tag = gender;
        }

        const allProducts = await Product.find(query);


        res.status(200).json({
            success: true,
            allProducts
        });
    }
    catch(err){
        next(appError(500,err.message))
    }
}

const getSingleProduct = async(req,res,next) => {
    try{
        const {id} = req.params
        if(!id){
            return appError(402,'ProdId is not provided');
        }
        const singleProduct = await Product.findById(id);
        if(!singleProduct){
            return next(appError(404,'Product is not found'))
        }
        res.status(200).json({
            success:true,
            message:'Product is found',
            singleProduct
        })
    }
    catch(err){
        next(appError(500,err.message))
    }
}

const updateProduct = async(req,res,next) => {
    try{}
    catch(err){
        next(appError())
    }
}

const deleteProduct = async(req,res,next) => {
    try{}
    catch(err){
        next(appError())
    }
}


module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
}