import React, { useEffect, useState } from "react";
import { buttonStyles, centerItem } from "../../../utils/utils";
import FeedDialogFormat from "./FeedDialogFormat";
import { bgColors } from "../../../constants/colorsData";
import { toastifyStatuses } from "../../../helpers/toastifyHelper";
import useGenerateInputs from "../../../hooks/useGenerateInputs";

const CreatePoll = ({ handleSpecificClose, specialData = false }) => {
  const [rightAnswer, setRightAnswer] = useState(1);
  const { inputs, data } = useGenerateInputs({
    justInput: true,
    array: Array(5)
      .fill()
      .map((_, i) => `${i < 1 ? "Question" : "Answer"}_${i > 0 ? i : i + 1}`),
    titles: Array(5)
      .fill()
      .map((_, i) => `${i < 1 ? "Question" : "Answer"}_${i > 0 ? i : i + 1}`),
    toastifyData: {
      status: toastifyStatuses.success,
      message: "Succesfully uploaded",
    },
    ...(specialData && {
      filledInData: specialData.filledInData,
      normalize: specialData.normalize,
    }),
    initialRequest: false,
    eachContainer: `w-full ${centerItem()} m-4`,
    fullContainer: "h-[85%] overflow-y-scroll",
  });

  specialData &&
    useEffect(() => {
      setRightAnswer(specialData.filledInData.rightAnswer);
    }, [specialData.filledInData]);

  const htmlData = (
    <div
      className={`${centerItem(
        "justify-evenly"
      )} relative w-full min-h-[90%] flex-col`}
    >
      <div className={`w-full h-full`}>
        {data}
        <div
          className={`${centerItem(
            "justify-between"
          )} bottom-0 bg-black/50 overflow-auto flex-col w-full`}
        >
          
          <h1 className="h-[10%] w-[90%] text-center">
            What is your correct answer?
          </h1>
         
          <div className={`w-full ${centerItem()} overflow-hidden`}>
            {Object.keys(inputs).map((_, i) => {
              return (
                i > 0 && (
                  <a
                    key={`feedAnswersButtons${i}`}
                    onClick={() => setRightAnswer(i)}
                    className={`${
                      rightAnswer === i
                        ? `${bgColors.ACCEPT} w-full h-full shadow-lg shadow-green-500/50`
                        : ``
                    } ${buttonStyles(
                      "text-2xl"
                    )} transition-all hover:bg-green-500/10`}
                  >
                    {i}
                  </a>
                )
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
  return (
    <FeedDialogFormat
      triggerDefaultAreYouSure={specialData.normalize === "EditPoll"}
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
      normalize={specialData ? specialData.normalize : "Poll"}
      shouldSpecialNorm={true}
      endpoint={`/polls/${
        (specialData && specialData.endpoint) || "createPoll"
      }`}
      method={specialData && specialData.method}
    />
  );
};

export default CreatePoll;
