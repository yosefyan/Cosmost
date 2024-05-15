import mongoose from "mongoose";
import { emailRegex } from "../../../../helpers/regexTypes.js";

const fieldType = ({
  type = String,
  min = 2,
  max = 256,
  minlength = 2,
  maxlength = 256,
  required = true,
  unique = false,
}) => ({
  type,
  min,
  max,
  minlength,
  maxlength,
  trim: true,
  required,
  unique,
});

const regexField = (regex, options = {}) => ({
  ...fieldType(options),
  match: [RegExp(regex), "Value did not match the regex."],
  ...(options.unique ? { unique: true } : {}),
});

const dateType = {
  type: Date,
  default: Date.now,
  required: false,
};

const booleanType = {
  type: Boolean,
  default: false,
};

const repetitiveObjects = async ({
  emailUnique = false,
  shouldPassword = false,
}) => ({
  Email: {
    ...regexField(emailRegex, {
      ...(emailUnique && { unique: true }),
      minlength: 5,
    }),
  },
  ...(shouldPassword && {
    Password: { ...fieldType({ min: 7 }) },
  }),
});

const senderReceiver = async (shouldUserId = true) => ({
  sender: { type: mongoose.Schema.Types.ObjectId },
  receiver: { type: mongoose.Schema.Types.ObjectId },
  ...(shouldUserId && {
    user_id: { type: mongoose.Schema.Types.ObjectId },
  }),
});

export {
  fieldType,
  dateType,
  regexField,
  booleanType,
  repetitiveObjects,
  senderReceiver,
};
