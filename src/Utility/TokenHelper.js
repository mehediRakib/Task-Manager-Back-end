const jwt=require('jsonwebtoken');
const DecodeToken=(token)=>{
    try{
        const secretKey='SecretKey12345678';
        return jwt.verify(token,secretKey);
    }catch (e) {
        return null;
    }
}

module.exports=DecodeToken;