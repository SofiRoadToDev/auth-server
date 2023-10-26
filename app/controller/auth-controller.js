const db=require('../../models')
const bcrypt=require('bcrypt')
const {genToken}=require('../utils/tokenGen')
const sendMail=require('../utils/mailer')

 const registerController=async(req,res)=>{
    const{username,email,password}=req.body
    const user={
        username,
        email
    }
    const uniqueString=await genToken(user,true)
    let isValid=false

    try {
        const salt=await bcrypt.genSalt()
        const hashedPassword=await bcrypt.hash(password,salt)

        const userAlreadyExists=await db.User.findOne({
            where:{
                username:username
            }
        })
        
        const emailAlreadyExists=await db.User.findOne({
            where:{
                email:email
            }
        })
       
        
        if(userAlreadyExists || emailAlreadyExists){
            res.status(400).json({msg:'This user already exists'})
        
        }else{
            const result=await db.User.create({
                username,
                password:hashedPassword,
                email,
                uniqueString,
                isValid
            });
            sendMail(email,'Email Validation',uniqueString,'validate')
            res.status(201).json({msg:'awaiting to email validation'})
        }
            

    } catch (error) {
        res.status(500).json({res:'There is a problem with our server'})
        console.error(error.message)
    }
    
    

    
}

const loginController=async(req,res)=>{
    const{username,password}=req.body
    try {
        const user=await db.User.findOne({
            where:{
                username:username
            },
            atttributes:{
                exclude:['createdAt','updatedAt']
            }
        })
        console.log(user)
        if(user){
            if(await bcrypt.compare(password,user.password)){
                let token=await genToken(user,false)
                console.log(`user ${user.username} logged in ${new Date()}`)
                console.log(` token generated: ${token}`)
                res.status(200).json({token:token})
            }else{
                res.status(401).json({res:'Wrong  password'})
            }
        }else{
            res.status(404).json({res:'User not found'})
        }
    } catch (error) {    
        res.status(500).json({res:'There was a problem with the server'})
        console.error('ERROR: '+error.message)
    }
    

}

const refreshTokenController=(req,res)=>{

}


const testRootEndPoint=(req,res)=>{
    res.send('<h3>Routing working well</h3>')
}


const testAuth=(req,res)=>{
    res.json({msg:'acess has been  granted'})
}


const verifyEmail=async (req,res)=>{
    const {uniqueString}=req.params
    const user= await db.User.findOne({
        where:{
            uniqueString:uniqueString
        },
        atttributes:{
            exclude:['createdAt','updatedAt']
        }
    })
    if(user){
        const res= await db.User.update(
            {isValid:true},
            {where:{
                uniqueString:uniqueString
            } }
        )

        if (res==1){
            sendMail(user.email,'Verification successfull',null,'success')
        }
    }
}



module.exports={
    registerController,
    testRootEndPoint,
    loginController,
    refreshTokenController,
    testAuth,
    verifyEmail
}