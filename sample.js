const express = require("express");
const mongoose = require("mongoose");
// const devuser=require('./model')
const devuser=require('./model')
const jwt=require('jsonwebtoken')
const middleware=require('./middleware')
const review=require('./reviewmodel');
const reviewmodel = require("./reviewmodel");
const cors=require('cors')
const app = express();

mongoose.connect("mongodb+srv://Vineesha:Vineesha@cluster0.qnbn0pm.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true, // Add this option
  useUnifiedTopology: true // Add this option to fix warning message
})
.then(() => console.log("connected db..."))
.catch(err => console.log(err));

app.use(express.json())
app.use(cors({origin:"*"}))

app.get('/',(req,res)=>{
  return res.send('Hello World')
})
app.get('/myprofile',middleware,async(req,res)=>{
try{
let user=await devuser.findById(req.user.id)
return res.json(user)
}
catch(err){
  console.log(err)
  return res.status(500).send('server error')
  }
})
app.get('/allprofiles',middleware,async(req,res)=>{
 try{
  let allprofiles=await devuser.find()
  return res.json(allprofiles)
 }
 catch(err){
  console.log(err)
  return res.status(500).send('server error')
  }
})
app.get('/myreview',middleware,async(req,res)=>{
  try{
   let allreviews=await reviewmodel.find()
   let myreviews=allreviews.filter(review=>review.taskProvider.toString())
   return res.status(200).json(myreviews)

  }
  catch(err){
    console.log(err)
    return res.status(500).send('server error')
  }
})

app.post('/addreview',middleware,async(req,res)=>{
  try{
   const {taskworker,rating}=req.body;
   const exist=await devuser.findById(req.user.id)
   const newReview=new reviewmodel({
    taskProvider:exist.fullname,
    taskworker,rating
   })
   newReview.save()
   return res.status(200).send('review updated successfully!')
  }
  catch(err){
    console.log(err)
    return res.status(500).send('server error')
  }
})


app.post('/login',async(req,res)=>{
  try{
    const {email,password}=req.body
   const exist= await devuser.findOne({email});
   if(!exist){
    return res.status(400).send('useer not exist')
   }
   if(exist.password!=password){
    return res.status(400).send('password invalid')
   }
   let payload={
    user:{
      id:exist.id
    }
    
   }
   jwt.sign(payload,'jwtPassword',{expiresIn:960000000},
   (err,token)=>{
    if(err) throw err
    return res.json({token})
   })
  }
  catch(err){
    console.log(err)
    return res.status(500).send('server error')
    }
})


app.post('/register',async(req,res)=>{
  try{
   const {fullname,email,mobile,skill,password,confirmpassword}=req.body
   const exist=await devuser.findOne({email});
   if(exist){
    return res.status(400).send('User already registered')
   }
   if(password!=confirmpassword){
    return res.status(403).send('password invalid')
   }
   let newUser=new devuser({
    fullname,email,skill,mobile,password,confirmpassword
   })
   newUser.save();
   return res.status(200).send('user registered')
  }
  catch(err){
  console.log(err)
  return res.status(500).send('server error')
  }
})



// app.post('/addbrands',async(req,res)=>{
//  const {brandname}=req.body
//   try{
//   const newData=new BrandName({brandname})
//   await newData.save();
//   return res.send(await BrandName.find())
//  }
//  catch(err){
//   console.log(err.message)
//  }
// })
// // app.get("/", (req, res) => {
// //   res.send("hello world...!");
// // });
// app.get('/getallbrands',async(req,res)=>{
//   try{
//     const allData=await BrandName.find();
//    return res.json(allData)
//    }
//    catch(err){
//     console.log(err.message)
//    }
// })
// app.get('/getallbrands/:id',async(req,res)=>{
//   try{
//   const Data=await BrandName.findById(req.params.id)
//   return res.json(Data)
//   }
//   catch(err){
//   console.log(err.message)
//   }
// })
// app.delete('/deletebrand/:id',async(req,res)=>{
//   try{
//   await BrandName.findByIdAndDelete(req.params.id)
//   return res.json(await BrandName.find())
//   }
//   catch(err){
//   console.log(err.message)
//   }
// })

app.listen(5000, () => console.log("server running"));
