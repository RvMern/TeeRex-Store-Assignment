const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProduct } = require('../Controllers/productCtrl');
const route = express.Router();

route.post('/allproducts',getAllProducts)
route.post('/createproduct',createProduct)
route.get('/singleproduct/:id',getSingleProduct)
route.put('/updateproduct/:id',updateProduct)
route.delete('deleteproduct/:id',deleteProduct)





module.exports = route