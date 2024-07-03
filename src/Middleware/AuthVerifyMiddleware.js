const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>{
    const token=req.headers['token'];
    if(!token){
        res.status(401).json({status:'unauthorized',data:"No token Provided"})
    }
   try{
      const decode=jwt.verify(token,'SecretKey12345678')
           let email=decode['data']
           req.headers.email=email;
           next()

   }catch (e) {
       res.status(401).json({status:"unauthorized",data:e.toString()})
   }
}