import { localInstance } from "../utils/axiosSetup";

const dynamicAxiosMethod = async ({
  method,
  endpoint,
  shouldToken = true,
  innerData,
  instance = localInstance
}) => {
  try {
    let headers = {};
    if (shouldToken) {
      const token = localStorage.getItem("token");
      headers["token"] = token;
    }

    let neededStructure = [{ headers: { ...headers } }, innerData];

    let methodsStartWithHeaders = ["get", "delete"];

    const response = await instance[method](
      endpoint,
      ...(methodsStartWithHeaders.includes(method)
        ? neededStructure
        : neededStructure.reverse())
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export default dynamicAxiosMethod;
