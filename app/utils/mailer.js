const nodemailer=require('nodemailer')
require('dotenv').config({path:"../.env"})

const senEmail=(email,subject,stringKey,endpoint)=>{
    const transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.USER_MAIL || 'sofi.workaffairs@gmail.com',
            pass:process.env.PASSWORD_MAIL || 'qyph nhlh zwsv eykq'
        }
    })
    
    var mailOptions={
        from:process.env.USER_MAIL || 'sofi.workaffairs@gmail.com',
        to:email,
        subject:subject,
        html:endpoint !='success' ? `<a href="http://192.168.100.2:3001/auth/${endpoint}/${stringKey}">verify email</a>`:'<h3>Verification succeessfull!!</h3>'
    }
    console.log(` link gen to validate mail: http://192.168.100.2:3001/auth/${endpoint}/${stringKey}`)
        
    transporter.sendMail(mailOptions,(err,inf)=>{
        if(err){
            throw new Error(`Could not send the email: ${err.message}`)
        }else{
            console.log('email sent ! :)'+inf.response)
        }
    })
}

module.exports=senEmail
