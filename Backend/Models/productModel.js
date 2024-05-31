const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Product Name is required']
    },
    description:{
        type:String,
        required:[true,'Product Description is required']
    },
    image:{
        type:String,
        required:[true,'Product Image is required']
    },
    price:{
        type:Number,
        required:[true,'Product Price is required']
    },
    shirtColor:{
        type:String,
        required:[true,'Product Color is required']
    },
    tag:{
        type:String,
        required:[true, 'Product tag is required']
    },
    shirtType:{
        type:String,
        required:[true,'Product type is required']
    },
    stock:{
        type:Number,
        required:[true,'Stock value is required']
    }
})



module.exports = mongoose.model('Product',productSchema)