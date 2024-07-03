const userModel=require("../../Model/UserModel");
const jwt=require("jsonwebtoken");
const RegistrationService=async (req) => {
    try {
        const reqBody = req.body;
        const data = await userModel.create(reqBody);
        return {status:"success",data:data};

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


module.exports={
    RegistrationService,
    loginService,
    profileDetailsService,
    profileUpdateService
}