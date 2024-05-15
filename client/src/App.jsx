import WebRoutes from "./routes/WebRoutes";
import { ToastContainer } from "react-toastify";
import useInitLogin from "./hooks/useInitLogin";
import { Loading } from "./pages";
import AreYouSure from "./components/AreYouSure";
import { useSelector } from "react-redux";
import Dialog from "./components/Dialog";
import CreatePost from "./pages/Feed/feedDialogs/CreatePost";
import CreatePoll from "./pages/Feed/feedDialogs/CreatePoll";
import EditUser from "./pages/Admin/adminShards/EditUser";
import toastifyHelper, { toastifyStatuses } from "./helpers/toastifyHelper";
import dynamicAxiosMethod from "./helpers/dynamicAxiosMethod";
import normalizeData from "./utils/normalizeData";
import useDynamicDispatch from "./hooks/useDynamicDispatch";
import EditComment from "./pages/Feed/feedDialogs/EditComment";

const App = () => {
  const { finishedLoading } = useInitLogin();
  const { toggleDialog, dialogType, data, axiosData, specific } = useSelector(
    (state) => ({
      userPayload: state.authReducer.userPayload,
      toggleDialog: state.globalReducer.dialogData.toggleDialog,
      dialogType: state.globalReducer.dialogData.dialogType,
      data: state.globalReducer.dialogData.data,
      axiosData: state.globalReducer.axiosData,
      specific: state.globalReducer.specific,
      dialogData: state.globalReducer.dialogData,
    })
  );
  const dynamicDispatch = useDynamicDispatch();
  const noBodyMethods = ["get", "delete"];
  const handleAreYouSure = async (i) => {
    try {
      if (i === 1) {
        await dynamicAxiosMethod({
          method: axiosData.method,
          endpoint: axiosData.endpoint.replace(/ /g, ""),
          ...(!noBodyMethods.includes(axiosData.method) &&
            axiosData.innerData &&
            data && {
              innerData: normalizeData({
                ...data.userData,
                ...JSON.parse(axiosData.innerData),
              })[axiosData.normalize],
            }),
        });
        toastifyHelper({
          status: toastifyStatuses.success,
          message: axiosData.toastifyMessage,
        });
      } else {
        dynamicDispatch("OPEN_DIALOG", {
          dialogType,
          toggleDialog: true,
        });
      }
    } catch (error) {
      error.response &&
        toastifyHelper({
          status: toastifyStatuses.error,
          message: error.response,
        });
    }
  };
  return (
    <>
      {dialogType === "areYouSure" && !specific && (
        <AreYouSure
          classes={`w-full h-[100%] lg:h-1/2 m-auto`}
          handleStatus={handleAreYouSure}
        />
      )}
      {data && dialogType !== "areYouSure" && (
        <Dialog
          classes={`w-full h-full`}
          specificToggle={toggleDialog && dialogType}
        >
          {dialogType === "editPost" ? (
            <CreatePost
              triggerDefaultAreYouSure={true}
              handleSpecificClose={() => null}
              specialData={{
                title: "Edit Post",
                filledInData: data,
                endpoint: `updatePost/${data._id}`,
                toastifyData: {
                  message: "Updated post succesfully!",
                  status: toastifyStatuses.success,
                },
                normalize: "EditPost",
                method: "put",
              }}
            />
          ) : dialogType === "editPoll" ? (
            <CreatePoll
              handleSpecificClose={() => null}
              specialData={{
                title: "Edit Poll",
                filledInData: data,
                endpoint: `updatePoll/${data._id}`,
                toastifyData: {
                  message: "Updated poll succesfully!",
                  status: toastifyStatuses.success,
                },
                normalize: "EditPoll",
                method: "put",
              }}
            />
          ) : dialogType === "editComment" ? (
            <EditComment
              handleSpecificClose={() => null}
              specialData={{
                axiosData: axiosData,
                title: "Edit Comment",
                filledInData: data,
                endpoint: `updateComment/${data._id}`,
                toastifyData: {
                  message: "Updated Comment succesfully!",
                  status: toastifyStatuses.success,
                },
                normalize: "editComment",
                method: "patch",
              }}
            />
          ) : (
            <EditUser
              handleSpecificClose={() => null}
              specialData={{
                axiosData: axiosData,
                title: "Edit User",
                filledInData: data,
                endpoint: `updateUser/${data._id}`,
                toastifyData: {
                  message: "Updated User succesfully!",
                  status: toastifyStatuses.success,
                },
                normalize: "EditUser",
                method: "put",
              }}
            />
          )}
        </Dialog>
      )}
      <ToastContainer />
      {finishedLoading ? <WebRoutes /> : <Loading done={finishedLoading} />}
    </>
  );
};

export default App;
