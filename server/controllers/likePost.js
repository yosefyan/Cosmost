import errorCreater from "../helpers/errorCreater.js";
import {
  getInstance,
  updateByIdInstance,
} from "../models/MongoDB/Collections/dynamicService.js";

const postInteraction = (collectionType, whereToUpdate) => {
  return async (req, res) => {
    try {
      const userId = req.userData._id;
      const postId = req.params.id;

      const updatePost = async (area, reversed) => {
        const post = await getInstance({
          collectionType,
          identifier: "_id",
          value: area,
        });

        const userToUpdateArray = post[0][whereToUpdate];
        const isUserInArray = userToUpdateArray.includes(
          whereToUpdate === "Friends" ? reversed : userId
        );
        if (isUserInArray) {
          userToUpdateArray.splice(userToUpdateArray.indexOf(reversed), 1);
        } else {
          userToUpdateArray.push(reversed || userId);
        }

        await updateByIdInstance({
          collectionType,
          identifier: area,
          data: post[0],
        });
      };

      if (whereToUpdate === "Friends") {
        const postIds = [userId, postId];
        const reversedFriends = [postId, userId];
        postIds.forEach((area, i) => updatePost(area, reversedFriends[i]));
      } else {
        await updatePost(
          collectionType === "users" && whereToUpdate === "Friends"
            ? userId
            : postId
        );
      }

      return res.json({ message: "Post interaction successfully updated." });
    } catch (error) {
      errorCreater(res, 400, error.message);
    }
  };
};

export default postInteraction;
