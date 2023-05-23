// const mongoose = require('mongoose');

// const brandSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   age: {
//     type: Number,
//     required: true
//   },
//   perc: {
//     type: String,
//     required: true
//   }


    
// });

// module.exports = mongoose.model('Brand', brandSchema);

//brands
const mongoose = require('mongoose');

const Stddata = new mongoose.Schema({
  // brandname: {
  //   type: String,
  //   required: true
  // },
  // prize: {
  //   type: String,
  //   required: true
  // }
    name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  perc: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Stddata', Stddata);


//Registration
// const mongoose=require('mongoose')
// let Registeruser=new mongoose.Schema({
//   username:{
//     type:String,
//     require:true
//   },
//   email:{
//     type:String,
//     require:true,
//     unique:true
//   },
//   password:{
//     type:String,
//     require:true
//   },
//   confirmpassword:{
//     type:String,
//     require:true
//   }
// })
// module.exports =mongoose.model('Registeruser',Registeruser)