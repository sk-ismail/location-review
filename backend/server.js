const express=require('express')
const app=express()
const cors=require('cors')
const mongoose=require('mongoose')
const path=require('path')
const env=require('dotenv')
const userRouter=require('./routes/user');
const pinRouter=require('./routes/pin');



env.config();

//const db=mongoose.connection;

app.use(cors({origin: '*'}))

mongoose.connect(process.env.MONGODB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

const db=mongoose.connection;
db.on('error', (err)=>{console.error(err)})

db.once('open', ()=>{
    console.log('connected')
})

app.use(express.static(path.join(__dirname, '../frontend')))
app.use(express.json());

app.use('/api/user', userRouter)
app.use('/api/pin', pinRouter)

app.listen(3001, ()=>{
    console.log("listening to port: 3000...")
})

app.post('/api/test', (req,res)=>{
    console.log(req.body)
    res.status(200).json({status: "ok", data: req.body})
})




