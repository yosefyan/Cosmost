import mongoose from "mongoose";
import { fieldType } from "../schemaShards/genericShards.js";
import { repObjects } from "../schemaShards/customShards/posts.js";

const commentsSchema = new mongoose.Schema({
  Comment: { ...fieldType({ min: 1 }) },
  Likes: [String],
  userData: {
    ...await repObjects(),
    Rank: { ...fieldType({ min: 4 }) },
    Username: { ...fieldType({ min: 1 }) },
  },
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const Comments = mongoose.model("comments", commentsSchema);

export default Comments;
