import mongoose from "mongoose";
import { fieldType, senderReceiver } from "../schemaShards/genericShards.js";
import { repObjects } from "../schemaShards/customShards/posts.js";

export const friendRequestsSchema = new mongoose.Schema({
  ...(await senderReceiver()),
  userData: {
    ...(await repObjects()),
    Rank: { ...fieldType({ min: 4 }) },
    Username: { ...fieldType({ min: 1 }) },
  },
});

const friendRequests = mongoose.model("friendrequests", friendRequestsSchema);

export default friendRequests;
