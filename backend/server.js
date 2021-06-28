const express=require('express')
const app=express()
const cors=require('cors')
const mongoose=require('mongoose')
const path=require('path')
const env=require('dotenv')




env.config();

//const db=mongoose.connection;

app.use(cors({origin: '*'}))

mongoose.connect(process.env.MONGODB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

const db=mongoose.connection;

app.use(express.static(path.join(__dirname, '../frontend')))

 

app.listen(3000, ()=>{
    console.log("listening...")
})
db.on('error', (err)=>{console.error(err)})

db.once('open', ()=>{
    console.log('connected')
})



