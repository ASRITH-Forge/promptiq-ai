import express from 'express';
import { createChat, deleteChat, getChats } from '../controllers/chatController';
import { protect } from '../middlewares/auth';

const chatRouter = express.Router();

chatRouter.get('/create',protect,createChat)
chatRouter.get('/get',protect,getChats)
chatRouter.delete('/delete',protect,deleteChat)

export default chatRouter;
