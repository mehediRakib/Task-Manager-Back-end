
const nodemailer=require('nodemailer');
const SentOTP=async (emailTo,emailSubject,emailText) => {
    const transporter = nodemailer.createTransport({
        host: "mail.teamrabbil.com",
        port: 25,
        secure: false,
        auth: {
            user: "info@teamrabbil.com",
            pass: '~sR4[bhaC[Qs',
        }

    })

   return  await transporter.sendMail({
        from: '"Task Manager" <info@teamrabbil.com>',
        to: emailTo,
        subject: emailSubject,
        text: emailText,
    })

}


module.exports=SentOTP;