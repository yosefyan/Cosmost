import { defaultPost, defaultUser } from "../constants/alternativePhotos.js";

const dynamicNormalize = (collectionType, data) => {
  try {
    const noImage = [
      "polls",
      "comments",
      "friendrequests",
      "messages",
      "rooms",
    ];
    return {
      ...data,
      ...(!noImage.includes(collectionType.modelName) && {
        image: {
          [collectionType.modelName === "users" ? "Profile_Picture" : "Upload"]:
            data.image.Profile_Picture ||
            (collectionType.modelName === "posts" && !data.image.Upload)
              ? defaultPost
              : collectionType.modelName === "users"
              ? defaultUser
              : data.image.Upload,
          Alt:
            data.image.Alt || collectionType.modelName === "posts"
              ? "Space Post"
              : "Space Avatar",
        },
      }),
    };
  } catch (error) {
    return new Error(error);
  }
};

export default dynamicNormalize;
