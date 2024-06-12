const jwt = require('jsonwebtoken');

let{promisify} = require('util');


   async function auth (req,res,next){
let {authorization}=req.headers;

if(!authorization){
    return res.status(401).json({masseg : "unauthorizatcated yom must login first"})
  }
  try{
    let decoded   =await  promisify(jwt.verify)(authorization,process.env.JWT_SECRET )
    req.id = decoded.data.id
  }catch(error){
    return res.status(401).json({masseg : "unauthorizatcated "})
  }
  next();

}
module.exports={auth}










module.exports={auth};