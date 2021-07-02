const mongoose=require('mongoose')

const pinSchema=new mongoose.Schema({
    username:{
        type: String,
        min: 3,
        max:20,
        require: true,
        
    },
    location:{
        type: String,
        min: 3,
       
        require: true,
        
    },
    title:{
        type: String,
        min: 3,
       
        require: true,
        
    },
    description:{
        type: String,
        min: 3,
        
        require: true,
        
    },
    rating:{
        type: Number,
        min: 0,
        max: 5,
        require: true,
        
    },
    lat:{
        type: Number,
        min: 0,
        
        require: true,
        
    },
    long:{
        type: Number,
        min: 0,
        
        require: true,
        
    }

},{ collection: "pindata", timestamps: true})


const pinModel=mongoose.model("pindata", pinSchema)


module.exports = pinModel;