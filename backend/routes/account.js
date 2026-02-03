import express from "express"
import mongoose from "mongoose"
import { Account } from "../db.js";

const router=express.Router();

router.get("/balance",async(req,res)=>{
    const account=await Account.findOne({
        userId:req.userId
    });
    res.json({
        balance:account.balance
    })
});

router.post("/transfer", async(req,res)=>{
    const session=await mongoose.startSession();

    session.startTransaction();
    const {account,to}=req.body;

    const fromAccount=await Account.findOne({userId:req.userId}).session(session);

    if (!fromAccount || fromAccount.balance < account){
        await session.abortTransaction();
        return res.status(400).json({
            message:"Insufficient balance"
        });
    }
    const toAccount=await Account.findOne({userId:to}).session(session);

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message:"Invalid account"
        });
    }

    await Account.updateOne({userId:req.userId},{$inc:{balance:-account}}).session(session);
    await Account.updateOne({userId:to}, {$inc:{balance:account}}).session(session);

    await session.commitTransaction();
    res.json({
        message:"Transfer successful"
    });
});
export default router;