import CloseDialog from "../../../components/CloseDialog";
import {
  buttonStyles,
  centerItem,
  gradient,
  titleStyles,
} from "../../../utils/utils";
import MessageFormat from "../../../components/MessageFormat";
import { bgColors, gradientColors } from "../../../constants/colorsData";
import { useSelector } from "react-redux";
import AreYouSure from "../../../components/AreYouSure";
import dynamicAxiosMethod from "../../../helpers/dynamicAxiosMethod";
import toastifyHelper, {
  toastifyStatuses,
} from "../../../helpers/toastifyHelper";
import normalizeData from "../../../utils/normalizeData";
import useDynamicDispatch from "../../../hooks/useDynamicDispatch";
import { uploadInstance } from "../../../utils/axiosSetup";

const FeedDialogFormat = ({
  triggerDefaultAreYouSure = false,
  handleSpecificClose,
  title,
  htmlData,
  height,
  innerData,
  toastifyData,
  normalize,
  endpoint,
  method,
  shouldSpecialNorm = false,
  onlyTitle = false,
  withoutMain = false,
}) => {
  const dynamicDispatch = useDynamicDispatch();
  const { axiosData } = useSelector((state) => state.globalReducer);
  const { userPayload } = useSelector((state) => state.authReducer);
  const handleFeedSubmit = (e) => {
    e.preventDefault();
    dynamicDispatch("OPEN_DIALOG", {
      dialogType: "areYouSure",
      ...(triggerDefaultAreYouSure
        ? { toggleDialog: true }
        : { specific: true }),
    });
    dynamicDispatch("SET_AXIOS_DATA", {
      ...axiosData,
      innerData: JSON.stringify(innerData),
    });
  };

  const handleStatus = async (i) => {
    const { Upload, selectedFile, ...rest } = innerData;
    const theData = { ...rest, ...normalizeData(innerData)[normalize] };
    const { message, status } = toastifyData;
    if (i === 1) {
      const commonData = {
        Shares: 0,
        userData: {
          Username: userPayload.Username,
          Rank: userPayload.Rank,
          Profile_Picture: userPayload.Profile_Picture,
          Alt: userPayload.Alt,
        },
      };
      try {
        if (
          (theData.image && theData.image?.Upload?.startsWith("blob")) ||
          (innerData?.Upload && innerData?.Upload.startsWith("blob"))
        ) {
          const formData = new FormData();
          formData.append("image", selectedFile);
          await dynamicAxiosMethod({
            shouldToken: true,
            method: "post",
            endpoint: "/",
            innerData: formData,
            instance: uploadInstance,
          });
        }
        await dynamicAxiosMethod({
          shouldToken: true,
          method: method || "post",
          endpoint: `${endpoint}`,
          innerData: shouldSpecialNorm
            ? {
                ...normalizeData({ ...theData })["Poll"],
                ...commonData,
              }
            : {
                ...rest,
                ...normalizeData(innerData)[normalize],
                ...commonData,
              },
        });
        toastifyHelper({ status, message });
      } catch (error) {
        error.response &&
          toastifyHelper({
            status: toastifyStatuses.error,
            message: error.response.data,
          });
      }
    }
  };
  return (
    <div className={`${centerItem()} h-full flex-col`}>
      {!withoutMain && <AreYouSure handleStatus={handleStatus} />}
      <CloseDialog handleSpecificClose={handleSpecificClose} />
      {(title || onlyTitle) && (
        <h1
          className={`w-full h-[25%] fly ${centerItem()} ${gradient(
            true,
            gradientColors.PRIMARY
          )} ${titleStyles("text-5xl")} tShadow`}
        >
          {title}
        </h1>
      )}

      <MessageFormat
        classes={`w-[80%] ${
          height ?? "h-[40%]"
        } shadow-[0_0_5rem_#7F7F7F] flex-col overflow-hidden`}
      >
        {htmlData}
      </MessageFormat>
      {title && !onlyTitle && (
        <button
          onClick={handleFeedSubmit}
          className={`w-[80%] ${centerItem()} gap-4 my-4 rounded-[20px] hover:scale-95 p-4 ${
            bgColors.ACCEPT
          } ${buttonStyles("text-3xl")}`}
        >
          SEND
        </button>
      )}
    </div>
  );
};

export default FeedDialogFormat;
