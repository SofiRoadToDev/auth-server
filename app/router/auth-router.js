const express=require('express')
const {registerController,testRootEndPoint,loginController}=require('../controller/auth-controller')

const route=express.Router()

    route.get('/',testRootEndPoint)
    route.post('/register',registerController)
    route.post('/login',loginController)







module.exports=route