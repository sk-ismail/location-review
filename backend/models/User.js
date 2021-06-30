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

},{ collection: "userdata", timestamps: true})


const userModel=mongoose.model("userdata", userSchema)


module.exports = userModel;