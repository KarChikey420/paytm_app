import express from 'express'
import cors from 'cors'
const mainrouter=require("./routes/index.js");

const app=express()
app.use(cors())
app.use(express.json())

app.use("/api/v1",mainrouter)
app.listen(3000)
