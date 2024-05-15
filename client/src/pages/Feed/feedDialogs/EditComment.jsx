import React, { useEffect, useState } from "react";
import { centerItem, titleStyles } from "../../../utils/utils";
import FeedDialogFormat from "../../Feed/feedDialogs/FeedDialogFormat";
import { textColors } from "../../../constants/colorsData";
import { toastifyStatuses } from "../../../helpers/toastifyHelper";
import useGenerateInputs from "../../../hooks/useGenerateInputs";
import ProfileNameTitle from "../../../components/ProfileNameTitle";
import useDynamicDispatch from "../../../hooks/useDynamicDispatch";

const EditComment = ({ handleSpecificClose, specialData = false }) => {
  const [rightAnswer, _] = useState(1);

  const { inputs, data } = useGenerateInputs({
    justInput: true,
    array: ["Comment"],
    titles: ["new comment"],
    toastifyData: {
      status: toastifyStatuses.success,
      message: "Succesfully edited",
    },
    ...(specialData && {
      filledInData: specialData.filledInData,
      normalize: specialData.normalize,
    }),
    initialRequest: false,
    eachContainer: `w-full h-full downUp bg-black/60 rounded-b-[25%] ${centerItem()} ${titleStyles(
      "text-8xl"
    )} ${textColors.PRIMARY} m-4`,
    fullContainer: `h-[85%] ${centerItem()} overflow-y-scroll`,
  });
  const dynamicDispatch = useDynamicDispatch();
  useEffect(() => {
    dynamicDispatch("SET_AXIOS_DATA", {
      ...specialData.axiosData,
      innerData: inputs,
    });
  }, [inputs]);

  const htmlData = (
    <div
      className={`${centerItem(
        "justify-evenly"
      )} relative w-full min-h-[90%] flex-col`}
    >
      <ProfileNameTitle
        endpoint={{
          patch: `${`/comments/updateComment/`}`,
          delete: `${`/comments/deleteComment/`} `,
        }}
        inputs={inputs}
        data={specialData.filledInData}
        rightSideData={" "}
        normalize={"editComment"}
      />
      {data}
    </div>
  );
  return (
    <FeedDialogFormat
      triggerDefaultAreYouSure={true}
      innerData={{ ...inputs, rightAnswer }}
      handleSpecificClose={handleSpecificClose}
      title={specialData && specialData?.title}
      height={"h-[60%]"}
      htmlData={htmlData}
      normalize={"EditComment"}
      shouldSpecialNorm={true}
    />
  );
};

export default EditComment;
