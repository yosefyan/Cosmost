import React from "react";
import { toastifyStatuses } from "../../../helpers/toastifyHelper";
import FeedDialogFormat from "./FeedDialogFormat";
import SectionsData from "../../../components/SectionsData";

const ViewFeed = ({ handleSpecificClose }) => {
  const htmlData = (
    <SectionsData
      postKind={["Post", "Poll"]}
      endPointsArray={["posts/getAllPosts", "polls/getAllPolls"]}
    />
  );
  return (
    <FeedDialogFormat
    withoutMain
      toastifyData={{
        message: "Created poll succesfully!",
        status: toastifyStatuses.success,
      }}
      height={"w-[90%] h-[90%]"}
      handleSpecificClose={handleSpecificClose}
      htmlData={htmlData}
    />
  );
};

export default ViewFeed;
