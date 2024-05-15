import mongoose from "mongoose";
import { dateType, fieldType } from "../schemaShards/genericShards.js";
import posts from "../schemaShards/customShards/posts.js";

const repPosts = await posts(false);

const pollsSchema = new mongoose.Schema({
  Question_1: { ...fieldType({ min: 1 }) },
  Answers: [String],
  rightAnswer: { ...fieldType({ type: Number, min: 1 }) },
  ...repPosts,
  createdAt: dateType,
});

const Polls = mongoose.model("polls", pollsSchema);

export default Polls;
