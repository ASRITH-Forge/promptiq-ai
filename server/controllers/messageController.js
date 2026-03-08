import Chat from "../models/Chat.js"

//Text-based AI chat message controller

import Chat from "../models/Chat"

export const textMessageController = async (req,res)=>{
    try {
        const userId = req.user._id

        const {chatId,prompt} = req.body

        const chat = await Chat.findOne({userId,_id:chatId})
        chat.messages.push({role:"User",content: prompt,timestamp:Date.now(),isImage:false})
        
        await chat.save()
    } catch (error) {
        res.status(500).json({ message: 'Error creating message' })
    }
}