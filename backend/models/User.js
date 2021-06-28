const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    username:{
        type: String,
        min: 3,
        max: 30,
        required,
        unique: true
    },
    email:{
        type: String,
        min: 3,
        max: 30,
        required,
        unique: true
    },
    password:{
        type: String,
        min: 3,
        max: 30,
        required,
        unique: true
    }

},{ collection: "userData", timestamps: true})


const userModel=mongoose.model("userSchema", userSchema)


module.exports = userModel;