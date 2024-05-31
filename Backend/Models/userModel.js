const mongoose = require("mongoose")
const validator = require('validator')
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Username is required'],
        minlength:[3,'Username must contain at least 3 characters'],
        maxlength:[30,'Username must not exceed more than 30 characters']
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        validate:{
            validator:(value)=>{validator.isEmail(value)},
            message: 'Please Enter A Valid Email Address'
        },
        unique:true
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        validate:{
            validator:(value)=>{validator.isStrongPassword(value)},
            message: 'Password must contain at least 8 characters'
        }
    },
    // ! Not Implementing this field
    profilePhoto:{
        type:String,
        default:''
    },
    role:{
        type:String,
        default:'user'
    },
    cart:[{
        prodId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        },
        quantity:{
            type: Number,
            default:1
        }
    }],
    orderHistory:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order'
    }]
},
{
    timestamps:true
})


userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    const hashedPassword = await bcrypt.hash(this.password,10);
    this.password = hashedPassword
})

userSchema.methods.generateToken = async function(){
    const generatedToken = await JWT.sign({id:this.id},process.env.JWT_SECRET,{expiresIn:'7d'})
    const bearerToken = `Bearer ${generatedToken}`
    return bearerToken;
}


userSchema.methods.comparePassword = async function(password){
    const validPassword =  await bcrypt.compare(password,this.password);
    return validPassword;
}


module.exports = new mongoose.model('User',userSchema)