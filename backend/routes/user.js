import express from 'express'
import zod from 'zod'
import { User } from "../db/index.js"
import JWT_SECRET from './config'
import jwt from 'jsonwebtoken'

const router=express.Router()

const signupSchema=zod.object({
    username:zod.string(),
    email:zod.string().email(),
    password:zod.string()
})

router.post("/signup",async(req,res)=>{
    const body=req.body;
    const{success}=signupSchema.safeParse(body)

    if(!success){
        return res.json({
            message:"Email already taken / incorrect input"
        })
    }

    const user = await User.findOne({
        username:body.username
    })

    if (user?._id){
        return res.json({
            message:"Email already taken / incorrect inputs"
        })
    }
    
    const dbUser=await User.create(body);
    const Token=jwt.sign({
        id:dbUser._id
    },JWT_SECRET)
    res.json({
        massage:"User created successfully",
        Token:Token
    })
        
    
    return res.json({
        message: "User created successfully",
        userId: dbUser._id
    })
})
export default router