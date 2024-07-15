const mongoose=require('mongoose');

const DataSchema=mongoose.Schema({
    email:{type:String},
    otp:{type:String},
    status:{type:String,default:0}
},{
    versionKey:false,timeStamp:true
})

const OtpModel=mongoose.model('otps',DataSchema);

module.exports=OtpModel;
