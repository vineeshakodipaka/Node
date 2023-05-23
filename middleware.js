// const jwt=require('jsonwebtoken')
// module.exports=function(req,res,next){
//     try{
//       let token=req.header('x-token')
//       if(!token){
//          return res.status(400).send('Token not found')
//       }
//       let decoded=jwt.verify(token,'jwtPassword');
//       req.user=decoded.user;
//       next();
//     }
//     catch(err){
//         console.log(err)
//         return res.status(400).send('Authentication Error')
//     }
// }
const jwt=require('jsonwebtoken')

module.exports=function(req,res,next){
  try{
 let token=req.header('x-token')
 if(!token){
  return res.status(400).send("Server Error")
 }
 let decode=jwt.verify(token,"jwtSecret")
req.user=decode.user
next();
  }
  catch(err){
 console.log(err);
 return res.status(400).send("Server Error")
  }
}