const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    username:{
        type: String,
        min: 3,
        
        require: true,
        unique: true
    },
    email:{
        type: String,
        min: 3,
       
        require: true,
        unique: true
    },
    password:{
        type: String,
        min: 3,
        require: true,
        
    }

},{ timestamps: true})


const userModel=mongoose.model("userData", userSchema)


module.exports = userModel;