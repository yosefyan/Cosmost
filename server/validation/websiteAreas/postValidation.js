import Joi from "joi";
import { inlineValidation } from "../genericValidation.js";
import { emailPassword } from "../validationShards.js";

const postValidation = async (data, whatType = "posts") => {
  try {
    let schemaObject = {
      createdAt: Joi.date(),
      userData: {
        Profile_Picture: inlineValidation({}),
        Alt: inlineValidation({}),
        Rank: inlineValidation({
          min: 4,
        }),
        Username: inlineValidation({
          min: 1,
        }),
      },
      Likes: Joi.array().items(Joi.string()),
      ...(whatType !== "comments" && {
        Shares: inlineValidation({ min: 0, type: Joi.number() }),
      }),
    };

    let receiverSender = {
      receiver: inlineValidation({}),
      sender: inlineValidation({}),
    };

    const leftTopPart = Joi.array().items({
      leftPart: {
        imgSrc: inlineValidation({}),
      },
      topPart: {
        Name: inlineValidation({}),
        Type: inlineValidation({}),
        Rarity: inlineValidation({}),
      },
    });
    const { Likes, Shares, ...rest } = schemaObject;
    switch (whatType) {
      case "users":
        schemaObject = {
          ...rest,
          ...(await emailPassword()),
          Date_Of_Birth: inlineValidation({
            type: Joi.date(),
            isRequired: false,
          }),
          Bio: inlineValidation({ min: 15, isRequired: false }),
          Friends: Joi.array().items(Joi.string()),
          moneyData: {
            coins: inlineValidation({ min: 0, max: 99999, type: Joi.number() }),
            gems: inlineValidation({ min: 0, max: 99999, type: Joi.number() }),
          },
          ownedStuff: {
            titles: Joi.array().items(Joi.string()),
            pets: Joi.array().items(Joi.string()),
            ranks: Joi.array().items(Joi.string()),
          },
        };
        break;
      case "posts":
        schemaObject = {
          ...schemaObject,
          Textarea: inlineValidation({ min: 1 }),
          image: {
            Upload: inlineValidation({ isRequired: false }),
            Alt: inlineValidation({ isRequired: false }),
          },
        };
        break;
      case "polls":
        schemaObject = {
          ...schemaObject,
          Question_1: inlineValidation({}),
          Answers: Joi.array().items(Joi.string()),
          rightAnswer: inlineValidation({ type: Joi.number(), min: 1 }),
        };
        break;
      case "comments":
        schemaObject = {
          ...schemaObject,
          post_id: inlineValidation({}),
          user_id: inlineValidation({}),
          Comment: inlineValidation({ min: 1 }),
        };
        break;
      case "notifications":
        schemaObject = {
          ...rest,
          image: {
            Upload: inlineValidation({}),
            Alt: inlineValidation({}),
          },
          Message: inlineValidation({}),
          originalOwner: inlineValidation({}),
        };
        break;
      case "friendrequests":
        schemaObject = {
          ...rest,
          ...receiverSender,
        };
        break;
      case "messages":
        schemaObject = {
          ...rest,
          ...receiverSender,
          Message: inlineValidation({ min: 1 }),
          messageId: inlineValidation({}),
        };
        break;
      case "rooms":
        schemaObject = {
          ...rest,
          ...receiverSender,
          roomId: inlineValidation({}),
        };
        break;
      case "updateMoney":
        schemaObject = {
          moneyData: {
            coins: inlineValidation({ min: 0, max: 99999, type: Joi.number() }),
            gems: inlineValidation({ min: 0, max: 99999, type: Joi.number() }),
          },
        };
        break;
      case "updateOwnStuff":
        schemaObject = {
          ownedStuff: {
            titles: leftTopPart,
            pets: leftTopPart,
            ranks: leftTopPart,
          },
        };
        break;
      case "updatePost":
        schemaObject = {
          Textarea: inlineValidation({}),
          image: {
            Upload: inlineValidation({}),
            Alt: inlineValidation({}),
          },
        };
        break;
      case "updatePoll":
        schemaObject = {
          Question_1: inlineValidation({}),
          Answers: Joi.array().items(Joi.string()),
          rightAnswer: inlineValidation({ type: Joi.number(), min: 1, max: 4 }),
        };
        break;
      case "updateComment":
        schemaObject = {
          Comment: inlineValidation({}),
        };
        break;
      default:
        return schemaObject;
    }

    const Schema = Joi.object(schemaObject);
    return await Schema.validateAsync(data);
  } catch (error) {
    throw new Error(error);
  }
};

export default postValidation;
