const jwt = require('jsonwebtoken')
require('dotenv').config({path:"../.env"})

/** Input is an user object user:{username, email, password} 
 * and a flag isMail to indicate whether this token have to login user
 * or make an email validation.
*/
const genToken=async({username,email},isMail)=>{
    const SECRET=process.env.SECRET_KEY || '75dd04d5c47942d551b7387c5bb0a2249332add4530921de0dc0e61d13cb2598fd82370e1fa43ffd1c9d679fe933a8920a144202a8b2a1de01805ca6b7b0b779'
    let user;
    if(isMail){
         user={email:email}      
    }else{
         user={user:username}        
    }
    const accessToken= await jwt.sign(user,SECRET)
        return accessToken;
    
}


module.exports={genToken}