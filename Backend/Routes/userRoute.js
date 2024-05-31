const express = require('express');
const { userProfile, registerUser, loginUser, updateUser, deleteUser, addProductToCart, removeProductFromCart, updateQuantityInCart } = require('../Controllers/userCtrl');
const isLoggedIn = require('../Middlewares/isLoggedIn');
const route = express.Router();

route.get('/profile',isLoggedIn ,userProfile)
route.post('/register',registerUser)
route.post('/login',loginUser)
route.post('/addproducttocart',isLoggedIn, addProductToCart)
route.put('/updatequantityincart', isLoggedIn, updateQuantityInCart)

route.put('/update/userprofile',isLoggedIn, updateUser)
route.delete('/deleteproductfromcart',isLoggedIn, removeProductFromCart)
route.delete('/delete/userprofile',isLoggedIn, deleteUser)




module.exports = route