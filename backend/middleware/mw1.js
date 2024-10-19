const jwt = require("jsonwebtoken");
function profileAuthentication(req,res,next)
{
    jwt.verify(req.cookies.token,process.env.SECRETKEY,(err,decoded)=>{
         if(err)
         {
            res.send({redirect:"/notidentified",error:err});
         }
         else{
            req.decoded=decoded;
            next();
         }
    })
}

module.exports=profileAuthentication;