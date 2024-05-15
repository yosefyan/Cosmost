import React from "react";
import DataArea from "./profileSections/DataArea";
import ProfilePictureArea from "./profileSections/ProfilePictureArea";
import { centerItem } from "../../utils/utils";
import PortalNav from "../../components/PortalNav";
import { useSelector } from "react-redux";
import Loading from "../Loading/Loading";

const Profile = () => {
  const { userPayload } = useSelector((state) => state.authReducer);

  return (
    <>
      {userPayload ? (
        <div
          className={`w-[100vw] h-full lg:h-[100vh] overflow-y-scroll lg:overflow-hidden bgGradientFeed ${centerItem()} flex-col lg:flex-row`}
        >
          <PortalNav />
          <DataArea />
          <ProfilePictureArea />
        </div>
      ) : (
        <Loading done={userPayload} />
      )}
    </>
  );
};

export default Profile;
