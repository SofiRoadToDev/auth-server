require('dotenv').config()
const express=require('express')
const app= express()
const cors=require('cors')
const path=require('path')
const authRouter=require(path.join(__dirname,'/router/auth-router.js'))

app.use(cors())
app.use(express.json())
app.use('/auth',authRouter)

const PORT=process.env.SERVER_PORT || 3001


app.listen(PORT,()=>console.log(`Server up on http://localhost:${PORT}/auth`))