import React, { useEffect, useState } from "react";
import { centerItem, titleStyles } from "../../../utils/utils";
import FeedDialogFormat from "../../Feed/feedDialogs/FeedDialogFormat";
import { textColors } from "../../../constants/colorsData";
import { toastifyStatuses } from "../../../helpers/toastifyHelper";
import useGenerateInputs from "../../../hooks/useGenerateInputs";
import ProfileNameTitle from "../../../components/ProfileNameTitle";
import useDynamicDispatch from "../../../hooks/useDynamicDispatch";

const EditUser = ({ handleSpecificClose, specialData = false }) => {
  const [rightAnswer, setRightAnswer] = useState(1);

  const { inputs, data } = useGenerateInputs({
    justInput: true,
    array: ["Username"],
    titles: ["Username"],
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

  specialData &&
    useEffect(() => {
      setRightAnswer(specialData.filledInData.rightAnswer);
    }, [specialData.filledInData]);
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
        inputs={inputs}
        data={specialData.filledInData}
        rightSideData={" "}
        normalize={"EditUsername"}
      />
      {data}
    </div>
  );
  return (
    <FeedDialogFormat
      triggerDefaultAreYouSure={true}
      toastifyData={{
        message: specialData
          ? specialData.toastifyData.message
          : "Created poll succesfully!",
        status: specialData
          ? specialData.toastifyData.status
          : toastifyStatuses.success,
      }}
      innerData={{ ...inputs, rightAnswer }}
      handleSpecificClose={handleSpecificClose}
      title={specialData ? specialData?.title : "Create poll"}
      height={"h-[60%]"}
      htmlData={htmlData}
      normalize={"EditUsername"}
      shouldSpecialNorm={true}
      endpoint={`/polls/${(specialData && specialData.endpoint) || "EditUser"}`}
      method={specialData && specialData.method}
    />
  );
};

export default EditUser;
