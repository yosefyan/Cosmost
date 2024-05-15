import mongoose from "mongoose";
import {
  dateType,
  fieldType,
  regexField,
} from "../schemaShards/genericShards.js";
import { urlRegex } from "../../../../helpers/regexTypes.js";
import posts from "../schemaShards/customShards/posts.js";

const repPosts = await posts(false);

const PostsSchema = new mongoose.Schema({
  ...repPosts,
  Textarea: { ...fieldType({ min: 1 }) },
  createdAt: dateType,
});

const Posts = mongoose.model("posts", PostsSchema);

export default Posts;
