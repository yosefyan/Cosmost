import React from "react";
import FeedDialogFormat from "./FeedDialogFormat";
import { toastifyStatuses } from "../../../helpers/toastifyHelper";
import { centerItem } from "../../../utils/utils";
import Page404 from "../../../components/Page404";

const NewsData = ({ handleSpecificClose }) => {
  const htmlData = (
    <div
      className={`w-full rounded-[20px] ${centerItem(
        "justify-evenly"
      )} flex-col`}
    >
      <Page404 />
    </div>
  );

  return (
    <FeedDialogFormat
      toastifyData={{
        message: "Loaded post succesfully!",
        status: toastifyStatuses.success,
      }}
      title={"News"}
      height={`h-[50vh]`}
      handleSpecificClose={handleSpecificClose}
      endpoint={"NewsData"}
      htmlData={htmlData}
      normalize={"Post"}
      onlyTitle
    />
  );
};

export default NewsData;
