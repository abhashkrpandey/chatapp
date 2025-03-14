const jwt = require("jsonwebtoken");
function profileAuthentication(req,res,next)
{
    jwt.verify(req.cookies.jwttoken,process.env.SECRETKEY,(err,decoded)=>{
         if(err)
         {
            res.json({message:"Not Ok",ki:err,cookies:req.cookies.jwttoken});
         }
         else{
            req.decoded=decoded;
            next();
         }
    })
}

module.exports=profileAuthentication;