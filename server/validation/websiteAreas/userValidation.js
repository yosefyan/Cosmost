import Joi from "joi";
import { inlineValidation } from "../genericValidation.js";
import { emailPassword } from "../validationShards.js";

const userValidation = async (
  data,
  shouldPassword = true,
  shouldRepeat = false,
  shouldEmail = true,
  onlyUsername = false
) => {
  try {
    const emailPasswordResult = await emailPassword(
      shouldPassword,
      shouldRepeat,
      shouldEmail
    );
    const Schema = onlyUsername
      ? Joi.object({
          userData: {
            Profile_Picture: inlineValidation({ type: Joi.string().uri() }),
            Alt: inlineValidation({}),
            Rank: inlineValidation({
              min: 4,
            }),
            Username: inlineValidation({
              min: 1,
            }),
          },
        })
      : Joi.object({
          userData: {
            Profile_Picture: inlineValidation({ type: Joi.string().uri() }),
            Alt: inlineValidation({}),
            Rank: inlineValidation({
              min: 4,
            }),
            Username: inlineValidation({
              min: 1,
            }),
          },
          ...emailPasswordResult,
          Date_Of_Birth: Joi.date().max("now").iso().less("now").required(),
          Bio: inlineValidation({
            min: 15,
          }),
          Friends: Joi.array().items(Joi.string()),
          moneyData: {
            coins: inlineValidation({ min: 0, max: 99999, type: Joi.number() }),
            gems: inlineValidation({ min: 0, max: 99999, type: Joi.number() }),
          },
          ownedStuff: Joi.object({
            titles: Joi.array()
              .items(
                Joi.object({
                  leftPart: Joi.object({
                    imgSrc: Joi.string().required(),
                  }).required(),
                  topPart: Joi.object({
                    Name: Joi.string().required(),
                    Type: Joi.string().required(),
                    Rarity: Joi.string().required(),
                  }).required(),
                })
              )
              .required(),
            pets: Joi.array()
              .items(
                Joi.object({
                  leftPart: Joi.object({
                    imgSrc: Joi.string().required(),
                  }).required(),
                  topPart: Joi.object({
                    Name: Joi.string().required(),
                    Type: Joi.string().required(),
                    Rarity: Joi.string().required(),
                  }).required(),
                })
              )
              .required(),
            ranks: Joi.array()
              .items(
                Joi.object({
                  leftPart: Joi.object({
                    imgSrc: Joi.string().required(),
                  }).required(),
                  topPart: Joi.object({
                    Name: Joi.string().required(),
                    Type: Joi.string().required(),
                    Rarity: Joi.string().required(),
                  }).required(),
                })
              )
              .required(),
          }).required(),
        });

    return await Schema.validateAsync(data);
  } catch (error) {
    throw new Error(error);
  }
};

export default userValidation;
