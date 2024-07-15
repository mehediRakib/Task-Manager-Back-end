const {RegistrationService, loginService, profileDetailsService, profileUpdateService, RecoverVerifyEmailService,
    OtpVerifyService, ResetPasswordService
} = require("../../Services/Users/UserService");

exports.registration=async (req, res) => {
    const result = await RegistrationService(req)
    res.status(200).json(result);
}

exports.login=async (req,res)=>{
    const result=await loginService(req);
    if(result.status==='success'){
        const cookieExpire = {
            expires:new Date(Date.now()+1000*60*60*24),
            httpOnly:false
        };
        res.cookie('token',result['token'],cookieExpire);
        res.status(200).json(result);
    }
    else {
        res.status(200).json(result);
    }

}

exports.profileDetails=async (req,res)=>{
    const result=await profileDetailsService(req);
    res.status(200).json(result);
}
exports.profileUpdate=async (req,res)=>{
    const result=await profileUpdateService(req);
    res.status(200).json(result);
}

exports.Logout=async (req,res)=>{
   res.clearCookie('token',{
       expires:new Date(Date.now()-24*60*60*1000)
   })
    res.status(200).json({status:"success",data:"Logout successfull"})
}

exports.RecoverVerifyEmail=async (req,res)=>{
    const result=await RecoverVerifyEmailService(req,res);
    res.status(200).json(result);
}

exports.OtpVerify=async (req,res)=>{
    const result=await OtpVerifyService(req);
    res.status(200).json(result)
}

exports.ResetPassword=async (req,res)=>{
    const result=await ResetPasswordService(req,res);
    res.status(200).json(result);
}