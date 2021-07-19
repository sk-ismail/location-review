const express=require('express')
const app=express()
const cors=require('cors')
const mongoose=require('mongoose')
const path=require('path')
const env=require('dotenv')
const userRouter=require('./routes/user');
const pinRouter=require('./routes/pin');
var http=require('http')




env.config();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://location-review.netlify.app");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(cors({
  origin: 'https://location-review.netlify.app',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
}))

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

app.listen(process.env.PORT || 3002, ()=>{
    console.log("listening to port: 3002...")
})





