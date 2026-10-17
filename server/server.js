import express from "express";
import 'dotenv/config'
import cors from "cors";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import chatRouter from "./routes/chatRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import creditRouter from "./routes/creditRoutes.js";
import { stripeWebhooks } from "./controllers/webhooks.js";

import mongoose from "mongoose";

const app = express()
await connectDB()
//stripe webhooks
app.post('/api/stripe',express.raw({type:'application/json'}),stripeWebhooks)
//middleware

app.use(cors())
app.use(express.json())

// Database connection check middleware
app.use('/api', (req, res, next) => {
    if (req.path === '/stripe') return next();
    if (mongoose.connection.readyState !== 1) {
        return res.json({
            success: false,
            message: "Database connection failed (MongoDB Authentication / Network error). Please check your MongoDB credentials in server/.env."
        });
    }
    next();
});

//routes
app.get("/",(req,res)=>res.send('Server is Live!'))
app.use('/api/user',userRouter)
app.use('/api/chat',chatRouter)
app.use('/api/message',messageRouter)
app.use('/api/credit',creditRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})