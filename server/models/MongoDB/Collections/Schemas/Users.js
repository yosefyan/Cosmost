import mongoose from "mongoose";
import {
  booleanType,
  dateType,
  fieldType,
  regexField,
} from "../schemaShards/genericShards.js";
import { repetitiveObjects } from "../schemaShards/genericShards.js";
import { urlRegex } from "../../../../helpers/regexTypes.js";
import posts from "../schemaShards/customShards/posts.js";

const repObjects = await repetitiveObjects({
  emailUnique: true,
  shouldPassword: false,
});

const leftTopPart = {
  leftPart: { imgSrc: { ...fieldType({ min: 1 }) } },
  topPart: {
    Name: { ...fieldType({ min: 1 }) },
    Type: { ...fieldType({ min: 1 }) },
    Rarity: { ...fieldType({ min: 1 }) },
  },
};

const repPosts = await posts(true);

const UserSchema = new mongoose.Schema({
  ...repObjects,
  ...repPosts,
  Repeat_Password: { ...fieldType({ min: 7, required: false }) },
  Date_Of_Birth: dateType,
  Bio: { ...fieldType({ min: 15, required: false }) },
  isAdmin: booleanType,
  createdAt: dateType,
  Friends: [String],
  moneyData: {
    coins: { ...fieldType({ min: 0, max: 99999, type: Number }) },
    gems: { ...fieldType({ min: 0, max: 99999, type: Number }) },
  },
  ownedStuff: {
    titles: [leftTopPart],
    pets: [leftTopPart],
    ranks: [leftTopPart],
  },
});

const User = mongoose.model("users", UserSchema);

export default User;
