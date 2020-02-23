const express=require('express')
const bodyparser=require('body-parser')
const postRoutes=require('./routes/posts')
const path = require('path')
const userRout= require('./routes/user')

const app=express()
//const connect=require('./connect')

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use("/images",express.static(path.join('backend/images')))

const MongoClient = require('mongodb').MongoClient
const uri="mongodb+srv://user:"+process.env.MONGO_ATLAS+"@jsmonk-gftte.mongodb.net/mean_stack"
//RCYjMY5yzEYryLAn
let collection="";
let dbo="";


 MongoClient.connect(uri, function(err, client) {
     if(err) {
          console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
     }
     console.log('Connected...');
     dbo=client.db("mean_stack")
     collection = dbo.collection("posts");
     return collection,dbo
     
  });

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Headers',
    'Origin,X-Requested-with,Content-type,Accept,Authorization')
    res.setHeader('Access-Control-Allow-Methods','POST,PATCH,PUT,GET,DELETE,OPTIONS')
    next()
    })

app.use("/api/posts",postRoutes)
app.use("/api/user",userRout)

app.get('/api/posts',(req,res)=>{
console.log(".get ")


  dbo.collection("posts").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    res.status(200).json({
        message : "data fetched sussessfully",
        posts : result
    })
   // db.close();
  });

})


app.use((req,res,next)=>{
res.send("from express")
})



module.exports = app