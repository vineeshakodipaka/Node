const express = require("express");
const router = express.Router();
const users = require("./userSchema");



// router.get("/",(req,res)=>{
//     console.log("connect");
// });

// register user

router.post("/register",async(req,res)=>{
    // console.log(req.body);
    const {name,email,age,mobile,work,add,desc} = req.body;

    if(!name || !email || !age || !mobile || !work || !add || !desc){
        res.status(422).json("plz fill the data");
    }

    try {
        
        const preuser = await users.findOne({email:email});
        console.log(preuser);

        if(preuser){
            res.status(422).json("this is user is already present");
        }else{
            const adduser = new users({
                name,email,age,mobile,work,add,desc
            });

            await adduser.save();
            res.status(201).json(adduser);
            console.log(adduser);
        }

    } catch (error) {
        res.status(422).json(error);
    }
})


// get userdata

router.get("/getdata",async(req,res)=>{
    try {
        const userdata = await users.find();
        res.status(201).json(userdata)
        console.log(userdata);
    } catch (error) {
        res.status(422).json(error);
    }
})

// get individual user

// router.get("/getdatas/:id",async(req,res)=>{
//     try {
//         console.log(req.params);
//         const {id} = req.params;

//         const userindividual = await users.findById({_id:id});
//         console.log(userindividual);
//         res.status(201).json(userindividual)

//     } catch (error) {
//         res.status(422).json(error);
//     }
// })
router.get('/getuser/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const user = await users.findById(id);
  
      if (!user) {
        // handle case where user is not found
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      // handle any errors that occur during the operation
      res.status(500).json({ message: 'Server error' });
    }
  });

// update user data

router.patch("/updateuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const updateduser = await users.findByIdAndUpdate(id,req.body,{
            new:true
        });

        console.log(updateduser);
        res.status(201).json(updateduser);

    } catch (error) {
        res.status(422).json(error);
    }
})


// delete user
router.delete("/deleteuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const deletuser = await users.findByIdAndDelete({_id:id})
        console.log(deletuser);
        res.status(201).json(deletuser);

    } catch (error) {
        res.status(422).json(error);
    }
})




module.exports = router;


Serer.js
// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");

// const users = require("./userSchema");
// const cors = require("cors");
// const router = require("./router");
// mongoose.connect("mongodb+srv://Vineesha:Vineesha@cluster0.qnbn0pm.mongodb.net/?retryWrites=true&w=majority", {
//   useNewUrlParser: true, // Add this option
//   useUnifiedTopology: true // Add this option to fix warning message
// })
// .then(() => console.log("connected db..."))
// .catch(err => console.log(err));

// app.use(cors());
// app.use(express.json());

// app.get("/",(req,res)=>{
//     res.json("server start")
// })

// app.use(router);

// app.listen(5000, () => console.log("server running"));











