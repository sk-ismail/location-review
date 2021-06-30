const Pin=require('../models/Pin');
const router=require('express').Router();

router.post('/', async (req, res)=>{
    const pinData=new Pin(req.body)
    
    try{
       
        const savedPin= await pinData.save();
        res.status(200).json({status: "ok", data: savedPin})


    }catch (err){
        res.status(500).json({status: 'error'})
    }
})


module.exports = router