const express=require('express')
const app=express()
const cors=require('cors')
const mongoose=require('mongoose')

const url='mongodb+srv://irfan:Irfan@2102@cluster0.gikhu.mongodb.net/location-review?retryWrites=true&w=majority'

//const db=mongoose.connection;

app.use(cors({origin: '*'}))

mongoose.connect(url,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

const db=mongoose.connection;


app.get('/', (req,res)=>{
  res.send('HI');
//  userdata.create({
//      Username: "Irfan",
//      Password: 'Irfan@2102'
//  })

  res.end()
})

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