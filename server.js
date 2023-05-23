//crud

// const express = require("express");
// const mongoose = require("mongoose");
// const Stddata=require('./model')
// const app = express();
// const cors=require('cors')
// mongoose.connect("mongodb+srv://Vineesha:Vineesha@cluster0.qnbn0pm.mongodb.net/?retryWrites=true&w=majority", {
//   useNewUrlParser: true, // Add this option
//   useUnifiedTopology: true // Add this option to fix warning message
// })
// .then(() => console.log("connected db..."))
// .catch(err => console.log(err));

// app.use(express.json())
// app.use(cors({origin:'*'}))
// app.get('/',(req,res)=>{
//   return res.send('Hello World')
// })
// app.post('/addbrands',async(req,res)=>{
//  const {name,age,perc}=req.body
//   try{
 
//   let newData=new Stddata({
//     name,age,perc
//    })

//   await newData.save();
//   return res.send(await Stddata.find())
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
//     const allData=await Stddata.find();
//    return res.json(allData)
//    }
//    catch(err){
//     console.log(err.message)
//    }
// })

// app.patch('/updatebrand/:id', async(req, res) => {
//   const { name,age,perc} = req.body;

//   // Check if id is valid
//   if (!req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id)) {
//     return res.status(400).json({ message: 'Invalid id' });
//   }

//   try {
//     const updatedBrand = await Stddata.findByIdAndUpdate(req.params.id, {name,age,perc }, { new: true });
//     return res.json(updatedBrand);
//   } catch (err) {
//     console.log(err.message);
//   }
// });


// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });




// app.get('/brands/:id', async (req, res) => {
//   const id = req.params.id;
//   try {
//     const brand = await Stddata.findById(id);
//     if (!brand) {
//       return res.status(404).json({ message: 'Brand not found' });
//     }
//     return res.json(brand);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: 'Server error' });
//   }
// });

// // app.get('/getallbrands/:id',async(req,res)=>{
// //   try{
// //   const Data=await Brandname.findById(req.params.id)
// //   return res.json(Data)
// //   }
// //   catch(err){
// //   console.log(err.message)
// //   }
// // })



// app.delete('/deletebrand/:id',async(req,res)=>{
//   try{
//   await Brandname.findByIdAndDelete(req.params.id)
//   return res.json(await Brandname.find())
//   }
//   catch(err){
//   console.log(err.message)
//   }
// })

// app.listen(5000, () => console.log("server running"));

//login
const express=require('express')
const mongoose=require('mongoose')
const Registeruser=require('./model')
const jwt=require('jsonwebtoken')
const middleware=require('./middleware')
const app=express()
const cors=require('cors')
mongoose.connect("mongodb+srv://Vineesha:Vineesha@cluster0.qnbn0pm.mongodb.net/?retryWrites=true&w=majority",{
  useNewUrlParser: true, // Add this option
    useUnifiedTopology: true // Add this option to fix warning message
})
.then(()=>console.log("db connected"))

app.use(express.json())
app.use(cors({origin:"*"}))
app.post('/register',async(req,res)=>{
  try{
    const {username,email,password,confirmpassword}=req.body;
    let exist=await Registeruser.findOne({email})
    if(exist){
    return res.status(400).send("User Already Exist")
    }
    if(password!==confirmpassword){
    return res.status(400).send("Passwords are not matching")
    }
    let newuser=new Registeruser({
      username,
      email,
      password,
      confirmpassword
    })
    await newuser.save();
    res.status(200).send("Registered successfully")
  }
  catch(err){
    console.log(err)
    return res.status(500).send("Internal server error")
  }
})
app.get("/",(req,res)=>{
  res.send("hello world")
})
//login
app.post("/login",async(req,res)=>{
try{
const {email,password}=req.body;
let exist=await Registeruser.findOne({email})
if(!exist){
  return res.status(400).send("User not found")
}
if(exist.password!=password){
return res.status(400).send("Invalid credeential")
}

//jwt token
let payload={
  user:{
    id:exist.id
  }
}
jwt.sign(payload,'jwtSecret',{expiresIn:40000000},
  (err,token)=>{
    if(err) throw err 
    return res.json({token})
  })
}
catch(err){
console.log(err)
return res.status(500).send("Server Error")
}
})
//myprofile
app.get("/dashboard",middleware,async(req,res)=>{
try{
  let exist=await Registeruser.findById(req.user.id)
  if(!exist){
    return res.status(400).send('User not found')
  }
  res.json(exist)
}
catch(err){
  console.log(err)
  return res.status(500).send("Invalid token")
}
})

//verify token
app.get('/verify', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Get token from headers
    const decodedToken = jwt.verify(token, 'jwtSecret'); // Verify token
    const user = await Registeruser.findById(decodedToken.user.id); // Find user by ID
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    res.json(user); // Send user data as response
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Invalid token' });
  }
});

app.listen(5000,()=>{
  console.log("server running....")
})
