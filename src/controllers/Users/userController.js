const {RegistrationService, loginService, profileDetailsService, profileUpdateService} = require("../../Services/Users/UserService");

exports.registration=async (req, res) => {
    const result = await RegistrationService(req)
    res.status(200).json(result);
}

exports.login=async (req,res)=>{
    const result=await loginService(req);
    res.status(200).json(result);
}

exports.profileDetails=async (req,res)=>{
    const result=await profileDetailsService(req);
    res.status(200).json(result);
}
exports.profileUpdate=async (req,res)=>{
    const result=await profileUpdateService(req);
    res.status(200).json(result);
}