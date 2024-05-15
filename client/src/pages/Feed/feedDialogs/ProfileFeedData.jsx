import React from "react";
import FeedDialogFormat from "./FeedDialogFormat";
import { toastifyStatuses } from "../../../helpers/toastifyHelper";
import SectionsData from "../../../components/SectionsData";

const ProfileFeedData = ({ handleSpecificClose }) => {
  const htmlData = (
    <SectionsData
      postKind={["Post", "Poll"]}
      specialTitle={"My"}
      endPointsArray={["posts/getAllMyPosts", "polls/getAllMyPolls"]}
    />
  );

  return (
    <FeedDialogFormat
      toastifyData={{
        message: "Loaded post succesfully!",
        status: toastifyStatuses.success,
      }}
      height={`w-[90%] h-[90%]`}
      handleSpecificClose={handleSpecificClose}
      endpoint={"ProfileFeedData"}
      htmlData={htmlData}
      normalize={"Post"}
      withoutMain={true}
    />
  );
};

export default ProfileFeedData;
