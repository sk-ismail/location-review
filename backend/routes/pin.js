const Pin=require('../models/Pin');
const router=require('express').Router();

router.post('/', async (req, res)=>{
    console.log(req.body)
      
    try{
       const data=req.body;
        const pindata= await Pin.create({
            username : data.username ,
            title: data.title,
            location : data.location,
            description: data.description,
            rating: data.rating,
            lat: data.lat,
            long: data.long
        }) 
     
         res.json(pindata)
    }catch (err){
        res.status(500).json({status: 'error'})
    }
})

router.get('/', async (req, res)=>{
    //console.log(req.body)
       //const { username, title, location, description, rating, lat, long } =req.body
    try{
        const pindata=await Pin.find().lean()

        if(pindata){
            //console.log('found pins')
            res.status(200).json({status: 'ok', data: pindata})
        }
        else{
            console.log('not found')
        }
     
         
    }catch (err){
        res.status(500).json({status: 'error'})
    }
})

module.exports = router