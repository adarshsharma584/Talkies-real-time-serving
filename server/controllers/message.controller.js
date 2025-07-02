
import asyncHandler from "../utils/asyncHandler.util.js";
import {errorHandler} from "../utils/errorHandler.util.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js"

const sendMessage = asyncHandler(async (req, res, next) =>
   {
  const senderId = req.user.id;
  const receiverId = req.params.receiverId;
  const {message} = req.body;

console.log("Sender ID:", senderId);
console.log("Receiver ID:", receiverId);
console.log("Message:", message);

  if (!senderId || !receiverId || !message) {
    return next(new errorHandler("Please fill all the fields", 400));
  }

 let conversation = await Conversation.findOne({
  participants: { $all: [senderId, receiverId] }
 });

 if(!conversation) {  
  conversation = await Conversation.create({
    participants: [senderId, receiverId],
    messages: [],
  });
 }

  const newMessage = await Message.create({
    senderId,
    receiverId,
    message,
  });

  if (!newMessage) {
    return next(new errorHandler("Message sending failed", 500));
  }
  console.log("New message created:", newMessage);
  console.log("new message id:", newMessage._id);
  console.log("new message id without underscore:", newMessage.id);

  conversation.messages.push(newMessage.id);
  await conversation.save();

  return res
  .status(201)
  .json({
    success: true,
    message: "Message sent successfully",
    data: newMessage,
  });
});


const getMessages = asyncHandler( async(req,res,next)=>{
  const myId = req.user.id;
  const {receiverId} = req.params;

  if (!myId || !receiverId) {
    return next(new errorHandler("Please provide both user IDs", 400));
  };

  const conversation = await Conversation.findOne({
    participants: { $all: [myId, receiverId] }
  }).populate("messages");

 console.log("Conversation found:", conversation.messages.map(msg => msg.message));

  if (!conversation) {
    return next(new errorHandler("No conversation found", 404));
  }

  if (conversation.participants.length < 2) {
    return next(new errorHandler("Conversation must have at least two participants", 400));
  }

  if (conversation.messages.length === 0) {
    return res.status(200).json({
      success: true,
      responseData: [],
      message: "No messages found",
    });
  }
return res.status(200).json({
    success: true,
    responseData: conversation.messages,
  });
});

  

export {sendMessage,getMessages};