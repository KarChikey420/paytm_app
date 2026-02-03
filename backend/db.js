import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

mongoose.connect(process.env.mongo_link);
console.log("db connected");

const UserSchema = mongoose.Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3,
            maxlength: 30
        },
        password:{
            type: String,
            required: true,
            minlength: 6
        },
        email:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        }
    }
)

const AccountSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})
const User=mongoose.model("User",UserSchema);
const Account=mongoose.model("Account", AccountSchema);

export {User,Account}