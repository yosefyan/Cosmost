import mongoose from "mongoose";
import { fieldType, regexField } from "../genericShards.js";
import { urlRegex } from "../../../../../helpers/regexTypes.js";

export const repObjects = async () => ({
  Profile_Picture: {
    ...regexField(urlRegex, { minlength: 3 }),
  },
  Alt: { ...fieldType({ min: 3 }) },
});

const posts = async (noInteractions) => ({
  userData: {
    ...(await repObjects()),
    Rank: { ...fieldType({ min: 4 }) },
    Username: { ...fieldType({ min: 1 }) },
  },
  ...(!noInteractions && {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    Likes: [String],
    peopleShared: { type: [mongoose.Schema.Types.ObjectId] },
    Shares: { ...fieldType({ min: 0, type: Number }) },
  }),
  image: {
    Upload: { ...regexField(urlRegex, { min: 3, required: false }) },
    Alt: { ...fieldType({ min: 3, required: false }) },
  },
});

export default posts;
