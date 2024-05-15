import { dateType, fieldType, senderReceiver } from "../schemaShards/genericShards.js";
import { friendRequestsSchema } from "./FriendRequests.js";
import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema({
  ...(await senderReceiver(false)),
  Message: { ...fieldType({ min: 1 }) },
  messageId: { ...fieldType({ min: 1 }) },
  createdAt: dateType,
});

const Messages = mongoose.model("messages", messagesSchema);

export default Messages;
