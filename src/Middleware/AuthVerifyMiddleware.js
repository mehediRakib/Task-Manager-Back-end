const DecodeToken = require("../Utility/TokenHelper");

module.exports = (req, res, next) => {
    let token = req.headers['token'] || req.cookies['token'];

    if (!token) {
        return res.status(401).json({ status: "unauthorized", message: "Token not provided" });
    }
    try {
        const decoded=DecodeToken(token)
        if(decoded===null){
            res.status(401).json({status:'fail',data:'Unauthorized'})
        }
        else {
            let email=decoded['data'];
            req.headers.email=email;
            next();
        }
    } catch (e) {
        return res.status(401).json({ status: "unauthorized", message: e.toString() });
    }

}
