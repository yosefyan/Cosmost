import React, { useEffect, useState } from "react";
import ProfileNameTitle from "../../../components/ProfileNameTitle";
import FeedInteractions from "../feedShards/FeedInteractions";
import { centerItem } from "../../../utils/utils";
import { bgColors } from "../../../constants/colorsData";
import useGenerateInputs from "../../../hooks/useGenerateInputs";
import toastifyHelper, {
  toastifyStatuses,
} from "../../../helpers/toastifyHelper";
import IconComponent from "../../../components/IconComponent";
import * as iconsData from "../../../constants/iconsData";
import dynamicAxiosMethod from "../../../helpers/dynamicAxiosMethod";
import { useSelector } from "react-redux";
import normalizeData from "../../../utils/normalizeData";
import Page404 from "../../../components/Page404";
import serverRoutes from "../../../constants/serverRoutes";

const CommentsData = ({
  data,
  handleComment,
  loadComments,
  clickedPost,
  selectedToDisplay,
}) => {
  const [commentsData, setCommentsData] = useState([]);
  const [submited, setSubmited] = useState(false);
  const info = useGenerateInputs({
    justInput: true,
    array: ["Comment"],
    titles: ["Your Comment"],
    toastifyData: {
      status: toastifyStatuses.success,
      message: "Posted a comment succesfully!",
    },
    fullContainer: "inline-block",
  });
  const { dialogData, userPayload } = useSelector((state) => ({
    dialogData: state.globalReducer.dialogData,
    userPayload: state.authReducer.userPayload,
  }));
  const handlePostComment = async () => {
    try {
      const { Profile_Picture, Alt, Rank, Username } = userPayload;
      await dynamicAxiosMethod({
        shouldToken: true,
        method: "post",
        endpoint: serverRoutes.post.createComment,
        innerData: {
          ...normalizeData({
            post_id: data._id,
            user_id: userPayload._id,
            Likes: [],
            Comment: info.inputs.Comment,
            Profile_Picture,
            Alt,
            Rank,
            Username,
          }).Comment,
        },
      });
      toastifyHelper({
        status: toastifyStatuses.success,
        message: "Created a comment succesfully!",
      });
      setSubmited((prev) => !prev);
    } catch (error) {
    }
  };

  useEffect(() => {
    const getNeededComments = async () => {
      try {
        const { data } = await dynamicAxiosMethod({
          method: "get",
          endpoint: `${serverRoutes.get.getCommentById}${clickedPost._id}`,
        });
        setCommentsData(data);
      } catch (error) {
        setCommentsData([]);
      }
    };
    getNeededComments();
  }, [
    loadComments,
    submited,
    !submited,
    dialogData.dialogType,
    selectedToDisplay,
  ]);

  return (
    <div className={`w-[90%] m-auto h-full flex-col overflow-y-scroll p-4`}>
      <div className={`w-full h-1/2 ${centerItem()}`}>
        {info.data}
        <IconComponent
          onClick={handlePostComment}
          classes={`w-[10%] h-1/2 cursor-pointer hover:scale-95 transition-all rounded-full bg-black ${centerItem()} text-2xl ${
            bgColors.ACCEPT
          } hover:bg-gray-500/50`}
          Icon={iconsData["IoSend"]}
        />
      </div>
      <div className={`w-full ${centerItem()} flex-col gap-8`}>
        {commentsData.length > 0 ? (
          commentsData?.map((comment, i) => {
            return (
              <div
                className={`w-full ${
                  i % 2 === 0 ? bgColors.SECONDARY : bgColors.PRIMARY
                } gap-4 flex-col relative rounded-[20px]`}
              >
                
                  <ProfileNameTitle
                    num={0}
                    endpoint={{
                      patch: `${`/comments/updateComment/${comment._id}`}`,
                      delete: `${`/comments/deleteComment/${comment._id}`} `,
                    }}
                    normalize={'editComment'}
                    shouldOpen={false}
                    data={comment}
                    dataType={'commentsData'}
                  />
              
                <p className="w-full bg-black p-4">{comment.Comment}</p>
                <FeedInteractions
                  commentsLength={commentsData.length}
                  shouldOnlyLike
                  postKind={"Comment"}
                  data={comment}
                  handleComment={handleComment}
                />
              </div>
            );
          })
        ) : (
          <Page404 />
        )}
      </div>
    </div>
  );
};

export default CommentsData;
