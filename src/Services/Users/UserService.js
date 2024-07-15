const userModel=require("../../Model/UserModel");
const jwt=require("jsonwebtoken");
const SentOTP = require("../../Utility/Email-Helper");
const OtpModel=require('../../Model/OtpModel');
const RegistrationService=async (req) => {
    try {
        const reqBody = req.body;
        const result=await userModel.find({email:reqBody.email});
        if(result.length>0){
            return {status:"exist",data:"email already exist"}
        }
        else
        {
            const data = await userModel.create(reqBody);
            return {status:"success",data:data};
        }

    } catch (e) {
        return {status:"fail",data:e.toString()};

    }
}

const loginService = async (req) => {
    try {
        let reqBody = req.body;
        const data = await userModel.aggregate([
            { $match: reqBody },
            { $project: { _id: 0, email: 1, firstName: 1, lastName: 1, mobile: 1, photo: 1 } }
        ]);

        if (data.length > 0) {
            let Payload = { exp: Math.floor(Date.now() / 1000 + (24 * 60 * 60)), data: data[0]['email'] };
            let token = jwt.sign(Payload,  'SecretKey12345678');
            return { status: "success", token: token, data: data[0] };
        } else {
            return { status: "unauthorized" };
        }
    } catch (e) {
        return { status: "fail", data: e.toString() };
    }
};


const profileDetailsService=async (req) => {
    try {
        let email = req.headers['email'];
        let data = await userModel.aggregate([
            {$match: {email: email}},
            {$project: {_id: 1, email: 1, firstName: 1, lastName: 1, mobile: 1, photo: 1, password: 1}}
        ])
        return {status: "success", data: data}
    } catch (e) {
        return {status: "fail", data: e.toString()};
    }
}

const profileUpdateService=async (req)=>{
    try{
        let reqBody=req.body;
        let email=req.headers['email'];
        const data=await userModel.updateOne({email:email},reqBody);
        return {status:"success",data:data};
    }catch (e) {
        return {status:"fail",data:e.toString()};
    }

}

const RecoverVerifyEmailService = async (req, res) => {
    try {
        let otp = Math.floor(( Math.random() * 900000)+100000);
        let emailText = `Your otp code is ${otp}`;
        let emailSub = "Email verification";
        const reqBody = req.body;
        const email = reqBody["email"];

        const result = await userModel.aggregate([
            { $match: { email: email } },
            { $count: 'total' }
        ]);

        if (result.length > 0) {
            const cookieExpire = {
                expire: new Date(Date.now() + 5 * 1000 * 60),
                httpOnly: false
            };
            res.cookie('otp', otp, cookieExpire);



            const data = await OtpModel.create({email:email,otp:otp});

            await SentOTP(email, emailSub, emailText);
            return { status: "success", message: "6 digit otp code has been sent", data: data };
        } else {
            return { status: "fail", data: "No user found" };
        }
    } catch (e) {
        return { status: "fail", data: e.toString() };
    }
};

const OtpVerifyService=async (req) => {
    try{
        const otp=req.params.otp;
        const email=req.params.email;
        const otpVerify=await OtpModel.aggregate([
            {$match:{email:email,otp:otp,status:'0'}},
            {$count:"total"}
        ])
        if(otpVerify.length>0){
            const OtpUpdate=await OtpModel.updateOne({email:email,otp:otp,status:'0'},{email:email,otp:otp,status:'1'});
            return {status: "success", data:OtpUpdate }
        }
        else {
            return {status:"fail",data:"Invalid Otp"}
        }


    }catch (e) {
        return {status:"fail",data:e.toString()}
    }
}


const ResetPasswordService=async (req,res)=>{
    const email=req.body['email'];
    const password=req.body['password'];
    const otp=req.cookies['otp'];
   try{

       const verifyEmail=await OtpModel.aggregate([
           {$match:{email:email,otp:otp,status:'1'}},{$count:'total'}
       ])
       if(verifyEmail.length>0){
           const updatePass=await userModel.updateOne({email:email},{password:password});
               res.clearCookie('otp',{
                   expires:new Date(Date.now()-24*60*1000)
               })

           return {status:"success",data:updatePass,message:"Password reset successfull"};
       }
       else {
           return {status:"fail",data:"Required valid email or Otp"}
       }
   }catch (e) {
       return {status:"fail",data:e.toString()};
   }
}


module.exports={
    RegistrationService,
    loginService,
    profileDetailsService,
    profileUpdateService,
    RecoverVerifyEmailService,
    OtpVerifyService,
    ResetPasswordService
}