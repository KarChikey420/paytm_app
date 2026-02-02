import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose.connect(process.env.mongo_link)

const PaySchema = mongoose.Schema(
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
        Email:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        }
    }
)
const Paytem=mongoose.model("Pay",PaySchema)

export {Paytem}