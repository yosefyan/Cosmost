import serverRoutes from "../../constants/serverRoutes";
import dynamicAxiosMethod from "../../helpers/dynamicAxiosMethod";

const repAxiosMethods = async (extraEndpoint = "sender") => {
  const { data } = await dynamicAxiosMethod({
    method: "get",
    shouldToken: true,
    endpoint: `${serverRoutes.get.getAllMyFriendrequests}?by=${extraEndpoint}`,
  });

  return data;
};

const neededRoom = async (roomId, reversedRoomId, userPayload, userData) => {
  if (!reversedRoomId.some((place) => place === undefined)) {
    try {
      return await dynamicAxiosMethod({
        method: "get",
        shouldToken: true,
        endpoint: `${serverRoutes.get.getRoomById}${roomId.join(
          ""
        )}-${reversedRoomId.join("")}`,
      });
    } catch (error) {
      await dynamicAxiosMethod({
        method: "post",
        shouldToken: true,
        endpoint: serverRoutes.post.createRoom,
        innerData: {
          sender: userPayload._id,
          receiver: userData.data && userData?.data[userData?.i]?._id,
          roomId: `${userPayload._id}${userData?.data[userData.i]?._id}`,
        },
      });
      return await dynamicAxiosMethod({
        method: "get",
        shouldToken: true,
        endpoint: `${serverRoutes.get.getRoomById}${roomId.join(
          ""
        )}-${reversedRoomId.join("")}`,
      });
    }
  }
};

const deleteFriend = async (friendsId) => {
  try {
    await dynamicAxiosMethod({
      method: "patch",
      shouldToken: true,
      endpoint: `${serverRoutes.patch.addUser}${friendsId}`,
    });
  } catch (error) {}
};

export { neededRoom, deleteFriend };
export default repAxiosMethods;
