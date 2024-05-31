const appError = require("../Utils/appError");
const User = require('../Models/userModel');
const Product = require('../Models/productModel');

const registerUser = async(req,res,next) => {
    try{
        const {username,email,password} = req.body
        if(username ==='' || email === '' || password === ''){
            return next(appError(400,'All fields are required'))
        }
        const findUser = await User.findOne({email:email});
        if(findUser){
            return next(appError(500,'This Email is already Taken'))
        }
        
        await User.create({
            username,
            email,
            password
        })
        
        res.status(200).json({
            success:true,
            message:'User Has been registered Successfully'
        })
    }
    catch(err){
        next(appError(500,err.message))
    }
}

const loginUser = async(req,res,next) => {
        try{
            const {email, password} = req.body;
            const findUser = await User.findOne({email}).populate('cart.prodId').exec();
    
            if(!findUser){
                return next(appError(401,'Invalid email or password'))
            }
    
            const validCheck = await findUser.comparePassword(password)
            if(!validCheck){
                return next(appError(401,'Invalid email or password'))
            }
            const token = await findUser.generateToken()
    
            res.status(200).json({
                success:true,
                message:'User has logged in Successfully',
                token,
                findUser
            })
        }
        catch(err){
            next(appError(500,err.message))
        }
}


const userProfile = async(req,res,next) => {
    try{
        const findProfile = await User.findById(req.user.id);
        if(!findProfile){
            return next(appError(404,'User not found'))
        }
        res.status(200).json({
            success:true,
            message:'User Profile found successfully',
            profile:findProfile
        })
    }
    catch(err){
        next(appError(500,err.message))
    }
}

const removeProductFromCart = async(req,res,next) => {
    try{
        const cartItemId = req.body;
        if(!cartItemId){
            return next(appError(404,'Product Id is not provided'))
        }
        const findUser = await User.findById(req.user.id).populate('cart.prodId').exec();
        if(!findUser){
            return next(appError(404,'User not found'))
        }
        const filteredCart = await findUser?.cart.filter(item => item._id.toString() !== cartItemId.orderId)

        findUser.cart = filteredCart;
        await findUser.save()
        res.status(200).json({
            success:true,
            message:'Removed from cart successfully',
            findUser
        })
    }
    catch(err){
        next(appError(500,err.message))
    }
}

const addProductToCart = async(req,res,next) => {
    try{
        const {prodId,quantity} = req.body;
        if(!prodId || !quantity){
            return next(appError(404,'Either Product Id or Quantity is not provided'))
        }
        const findUser = await User.findById(req.user.id);
        if(!findUser){
            return next(appError(404,'User not found'))
        }
        const foundItemInCart = await findUser.cart.find(item => item.prodId._id.toString() === prodId)

        if(foundItemInCart){
            return next(appError(400,'Item is already in the cart'))
        }

        const updatedUser = await User.findByIdAndUpdate(req.user.id,{$push:{cart: {prodId,quantity}}},{new:true}).populate('cart.prodId').exec();

        await findUser.save();
        res.status(200).json({
            success:true,
            message:'Added To Cart Successfully',
            updatedUser
        })
    }
    catch(err){
        next(appError(500,err.message))
    }
}

const updateQuantityInCart = async(req,res,next) => {
    try{
        const {quantity,cartItemId} = req.body;
        if(isNaN(quantity)){
            return next(appError(402,'Invalid Input. Please! Enter A Number!'));
        }
        const itemQuantity = parseInt(quantity)
        if(itemQuantity <= 0 ){
            return next(appError(401,"Quantity can\'t be less than or equal to 0"));
        }

        const findUser = await User.findById({_id:req.user.id});
        if(!findUser){
            return next(appError(404,'User not found'))
        }
        // findUser.cart.map(async (cartItem,index) => {
        //     if(cartItem._id.toString() === cartItemId){
        //         const getProduct = await Product.findById(cartItem.prodId);
        //         if(itemQuantity > getProduct.stock){
        //             return next(appError(403,`Quantity can\'t exceed the product stock value ${getProduct.stock}`));
        //         }
        //         console.log('i am now here');
        //         cartItem.quantity = itemQuantity
        //     }
        // })

        // ! Use Promise.all to wait for all promises to resolve
        await Promise.all(findUser.cart.map(async (cartItem, index) => {
            if (cartItem._id.toString() === cartItemId) {
                const getProduct = await Product.findById(cartItem.prodId);
                if (itemQuantity > getProduct.stock) {
                    return next(appError(403,`Quantity can\'t exceed the product stock value ${getProduct.stock}`));
                }
                cartItem.quantity = itemQuantity;
            }
        }))
        await findUser.save();
        await findUser.populate('cart.prodId');

        res.status(200).json({
            success:true,
            message:'User Cart Item Quantity Updated Successfully',
            findUser
        })
    }
    catch(err){
        next(appError(500,err.message))
    }
}

const updateUser = async(req,res,next) => {
    try{}
    catch(err){
        next(appError())
    }
}

const deleteUser = async(req,res,next) => {
    try{}
    catch(err){
        next(appError())
    }
}

module.exports = {
    registerUser,
    userProfile,
    addProductToCart,
    removeProductFromCart,
    loginUser,
    updateUser,
    deleteUser,
    updateQuantityInCart
}