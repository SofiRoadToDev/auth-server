const express=require('express')
const {verifyEmail,registerController,testRootEndPoint,loginController,testAuth}=require('../controller/auth-controller')
const {authMiddelware}=require('../middlewares/authMiddelware')

const route=express.Router()

    route.get('/',testRootEndPoint)
    route.get('/test',authMiddelware,testAuth)
    route.post('/register',registerController)
    route.post('/login',loginController)
    route.get('/validate/:uniqueString',verifyEmail)






module.exports=route