import mongoose from "mongoose";
import { dateType, fieldType } from "../schemaShards/genericShards.js";
import posts from "../schemaShards/customShards/posts.js";

const repPosts = await posts(true);

const notificationsSchema = new mongoose.Schema({
  ...repPosts,
  createdAt: dateType,
  Message: { ...fieldType({ min: 1 }) },
  originalOwner: { type: mongoose.Schema.Types.ObjectId },
});

const Notifications = mongoose.model("notifications", notificationsSchema);

export default Notifications;
