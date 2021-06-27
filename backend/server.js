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

const Schema=new mongoose.Schema({
    Username : { type: String, required: true, unique: true},
    Password: { type: String, required: true}
}, {
    collection: 'data'
})

const userdata=mongoose.model('Schema', Schema)