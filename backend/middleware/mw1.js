const jwt = require("jsonwebtoken");
function profileAuthentication(req, res, next) {
   const token = req.cookies.jwttoken;
   if (token) {
      jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
         if (err) {
            res.json({ message: "Not Ok", ki: err, cookies: req.cookies.jwttoken });
         }
         else {
            req.decoded = decoded;
            next();
         }
      })
   }
   else{
      res.json({"message":"token not provided"});
   }
}

module.exports = profileAuthentication;