
const jwt=require('jsonwebtoken')

const SECRET='75dd04d5c47942d551b7387c5bb0a2249332add4530921de0dc0e61d13cb2598fd82370e1fa43ffd1c9d679fe933a8920a144202a8b2a1de01805ca6b7b0b779'
const authMiddelware=async(req,res,next)=>{
   
    const {username}=req.body
    const headers=req.headers['authorization']   
    if(!headers){
        const token=await login(username)
        req.headers['auth-token']=token
        next()
    }else{
        const token=headers.split(' ')[1]
        if(token){
           jwt.verify(token,SECRET,(err,user)=>{
                if(error)
                    res.status(403)
                req.user=user
                next()
           })
    
        }
    }
    res.json({token:accessToken})
}


const genToken=async(username)=>{
    const user={user:username}
    const accessToken= await jwt.sign(user,SECRET)
    return accessToken;
}



module.exports={authMiddelware,genToken}