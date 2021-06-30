const User=require('../models/User')
const router = require('express').Router();
const bcrypt=require('bcrypt')

router.post('/register',async (req,res)=>{
   
    console.log(req.body)
    try{
           
        const salt= await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(req.body.password,salt);
        
        const newUser= await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })

        res.status(200).json(newUser)
    }catch(err){
        console.log(err)
           res.status(500).json({status: 'error'})
    }


})

router.post('/login',async (req,res)=>{
   const { username, email, password}=req.body;
    //console.log(username, email, password)
    try{
        const user=await User.findOne({ username, email }).lean()
         if(user){
            //console.log("found")
            if(await  bcrypt.compare(password, user.password)){
                //console.log("password found")
                res.json({status: "ok", messgae: "login"})
            }
            else{
                res.json({status: "error", message: "Invalid credentials"})
            }

         }
         else{
             console.log("User doesn't exist")
             res.json({status: "error", message: "User doesn't exist"})
         }
        

    }catch(err){
        console.log(err)
           res.status(500).json({status: 'error'})
    }


})



module.exports = router;