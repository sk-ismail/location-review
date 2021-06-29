const User=require('../models/User')
const router = require('express').Router();
const bcrypt=require('bcrypt')

router.post('/register',async (req,res)=>{
   
    console.log(req.body)
    try{
           
        const salt= await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(req.body.password,salt);

        const newUser= new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })

        const user=await newUser.save();
        

        res.status(200).json(user)
    }catch(err){
        console.log('error')
           res.status(500).json({status: 'error'})
    }
})

module.exports = router;