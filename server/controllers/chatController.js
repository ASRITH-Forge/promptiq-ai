import Chat from "../models/Chat"


//API controller for new chat 
export const createChat = async (req,res)=>{
    try {
        const userId = req.user._id

        const chatData = {
            userId,
            messages:[],
            name:"New Chat",
            username:req.user.name
        }
        await Chat.create(chatData);
        res.json({success:true,message:"Chat created "})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}