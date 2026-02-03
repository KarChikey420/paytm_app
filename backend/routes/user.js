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
            message : "Email already taken / incorrect inputs",
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
})

router.get("/bulk",async(req, res)=>{
    const filter = req.query.filter ? req.query.filter.trim() : "";

    const users = await User.find({
        $or: [{
            username: {
                $regex: new RegExp(filter, "i")
            }
        }]
    });
    
    res.json({
        user:users.map(user=>({
            username:user.username,
            _id:user._id,
            email:user.email
        }))
    })
})
export default router