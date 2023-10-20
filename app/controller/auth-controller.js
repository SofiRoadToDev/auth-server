const db=require('../../models')
const bcrypt=require('bcrypt')
const {genToken}=require('../middlewares/authMiddelware')


 const registerController=async(req,res)=>{
    const{username,email,password}=req.body

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
                email
            });
            res.status(201).json({msg:'result'})
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
            }
        })
        if(user){
            if(await bcrypt.compare(password,user.password)){
                let token=await genToken(username)
                res.status(200).json({token:token})
            }else{
                res.status(401).json({res:'Wrong  password'})
            }
        }else{
            res.status(400).json({res:'User not found'})
        }
    } catch (error) {
        res.status(500).json({res:'There was a problem with the server'})
        console.error(error.message)
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



module.exports={
    registerController,
    testRootEndPoint,
    loginController,
    refreshTokenController,
    testAuth
}