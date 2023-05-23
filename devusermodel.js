const mongoose=require('mangoose');
const devuser=new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true, 
    },
    mobile:{
        type:String,
        required:true,
    },
    skill:{
        
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    confirmpassword:{
        type:String,
        required:true,
    }
})
module.exports =mongoose.model('devuser',devuser)


// const mongoose = require("mongoose");


// const BrandName = mongoose.Schema({
//   brandname: {
//     type: String,
//     required: true,
//   },
//   data: {
//     type: Date,
//     default: Date.now,
//   },
// });


// module.exports = mongoose.model("brandname", BrandName);


//For storing data

// const mongoose = require("mongoose");


// const devuser = mongoose.Schema({
//   fullname:{
//             type:String,
//             required:true,
//         },
//         email:{
//             type:String,
//             required:true, 
//         },
//         mobile:{
//             type:String,
//             required:true,
//         },
//         skill:{
            
//             type:String,
//             required:true,
//         },
//         password:{
//             type:String,
//             required:true,
//         },
//         confirmpassword:{
//             type:String,
//             required:true,
//         }
// });


// module.exports = mongoose.model("devuser", devuser);

// const mongoose=require('mangoose');
// const devuser=new mongoose.Schema({
//     fullname:{
//         type:String,
//         required:true,
//     },
//     email:{
//         type:String,
//         required:true, 
//     },
//     mobile:{
//         type:String,
//         required:true,
//     },
//     skill:{
        
//         type:String,
//         required:true,
//     },
//     password:{
//         type:String,
//         required:true,
//     },
//     confirmpassword:{
//         type:String,
//         required:true,
//     }
// })
// module.exports =mongoose.model('devuser',devuser)