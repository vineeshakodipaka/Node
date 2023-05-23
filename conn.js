const mongoose = require("mongoose");

const DB = "mongodb+srv://Vineesha:Vineesha@cluster0.qnbn0pm.mongodb.net/?retryWrites=true&w=majority"


mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=> console.log("connection start")).catch((error)=> console.log(error.message));