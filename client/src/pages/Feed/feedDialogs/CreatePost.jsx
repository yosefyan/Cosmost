import React from "react";
import FeedDialogFormat from "./FeedDialogFormat";
import useGenerateInputs from "../../../hooks/useGenerateInputs";
import { toastifyStatuses } from "../../../helpers/toastifyHelper";
import { centerItem } from "../../../utils/utils";

const CreatePost = ({
  handleSpecificClose,
  specialData = false,
  triggerDefaultAreYouSure,
}) => {
  const { inputs, data, selectedFile } = useGenerateInputs({
    justInput: true,
    array: ["Textarea", "Upload"],
    titles: ["", ""],
    toastifyData: {
      status: toastifyStatuses.success,
      message: "Succesfully uploaded",
    },
    ...(specialData && {
      filledInData: specialData.filledInData,
      normalize: specialData.normalize,
    }),
    initialRequest: false,
    fullContainer: `overflow-scroll ${centerItem()} flex-col`,
    eachContainer: `w-full h-[80%]`,
  });

  const htmlData = <>{data}</>;
  return (
    <FeedDialogFormat
      triggerDefaultAreYouSure={triggerDefaultAreYouSure}
      toastifyData={{
        message: specialData
          ? specialData?.toastifyData.message
          : "Created post succesfully!",
        status: specialData
          ? specialData?.toastifyData.status
          : toastifyStatuses.success,
      }}
      innerData={{ ...inputs, selectedFile }}
      handleSpecificClose={handleSpecificClose}
      title={specialData ? specialData?.title : "Create post"}
      endpoint={`/posts/${
        (specialData && specialData.endpoint) || "createPost"
      }`}
      htmlData={htmlData}
      normalize={specialData ? specialData.normalize : "Post"}
      method={specialData && specialData.method}
    />
  );
};

export default CreatePost;
