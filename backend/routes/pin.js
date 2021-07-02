const Pin=require('../models/Pin');
const router=require('express').Router();

router.post('/', async (req, res)=>{
    //console.log(req.body)
      //const newPin=new Pin(req.body)
    try{
       const data=req.body;
       //console.log(data)
        const pindata= await Pin.create({
            username : data.username ,
            title: data.title,
            location : data.location,
            description: data.description,
            rating: data.rating,
            lat: data.lat,
            long: data.long
        }) 
        // const savedPin = await newPin.save();
        // res.status(200).json(savedPin);
         res.status(200).json({staus: "ok", data: pindata})
    }catch (err){
        console.log(err)
        //console.log('dola')
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
            res.status(200).json({status: 'ok', pindata})
        }
        else{
            console.log('not found')
        }
     
         
    }catch (err){
        res.status(500).json({status: 'error'})
    }
})

module.exports = router