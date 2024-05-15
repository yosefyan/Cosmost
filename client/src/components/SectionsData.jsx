import React, { useState, useEffect } from "react";
import { bgColors, gradientColors, textColors } from "../constants/colorsData";
import dynamicAxiosMethod from "../helpers/dynamicAxiosMethod";
import feedData from "../constants/feedData";
import * as iconsData from "../constants/iconsData";
import {
  buttonStyles,
  centerItem,
  gradient,
  titleStyles,
} from "../utils/utils";
import IconComponent from "./IconComponent";
import FeedInteractions from "../pages/Feed/feedShards/FeedInteractions";
import Page404 from "./Page404";
import Dialog from "../components/Dialog";
import CommentsData from "../pages/Feed/feedDialogs/CommentsData";
import ProfileNameTitle from "./ProfileNameTitle";
import { useSelector } from "react-redux";

const SectionsData = ({ endPointsArray, specialTitle = "", postKind }) => {
  const [postsPollsData, setPostsPollsData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [selectedToDisplay, setSelectedToDisplay] = useState(0);
  const { dialogData } = useSelector((state) => state.globalReducer);
  const [searchInput, setSearchInput] = useState("");
  const [openComments, setOpenComments] = useState({
    shouldOpen: false,
    postIndex: null,
  });
  const [correctBorder, setCorrectBorder] = useState({
    rightNumber: null,
    shouldReset: true,
    postIndex: null,
    answeredPosts: [],
  });

  const handleComment = (i, postIndex) => {
    i === 1 &&
      setOpenComments((prev) => ({
        shouldOpen: prev.postIndex !== postIndex ? true : !prev.shouldOpen,
        postIndex,
      }));
  };

  const handleInput = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setSearchInput(inputValue);

    if (originalData.length > 0) {
      const filteredData = originalData[selectedToDisplay].filter((data) =>
        data.Textarea
          ? data.Textarea.toLowerCase().includes(inputValue)
          : data.Question_1.toLowerCase().includes(inputValue)
      );
      setPostsPollsData((prevState) => {
        const newState = [...prevState];
        newState[selectedToDisplay] = inputValue
          ? filteredData
          : originalData[selectedToDisplay];
        return newState;
      });
    }
  };

  useEffect(() => {
    const loadPostsPolls = async () => {
      try {
        const data = await Promise.all(
          endPointsArray.map(async (req) => {
            try {
              const { data } = await dynamicAxiosMethod({
                method: "get",
                endpoint: `/${req}`,
              });

              return data;
            } catch (error) {
              return [];
            }
          })
        );
        setOriginalData(data);
        setPostsPollsData(data);
      } catch (error) {
        console.error("Error occurred during data loading:", error);
      }
    };

    loadPostsPolls();
  }, [
    dialogData.toggleDialog,
    !dialogData.toggleDialog,
    dialogData.dialogType === "",
  ]);

  return (
    <div
      className={`relative w-full min-h-full flex-col shadow-xl shadow-white`}
    >
      <div className="h-[10%] tShadow">
        <input
          placeholder={`🔍Search titles across ${
            postsPollsData[selectedToDisplay] &&
            postsPollsData[selectedToDisplay].length
          } amazing ${postKind[selectedToDisplay].toLowerCase()}/s...`}
          className={`w-full h-full text-white ${titleStyles(
            "text-1xl lg:text-2xl"
          )} text-center bg-black/50`}
          onChange={(e) => handleInput(e)}
          value={searchInput}
          type="text"
        />
      </div>
      <div className={`w-full h-[10%] ${centerItem()}`}>
        {feedData.ViewFeedDialogButtons.map((titleButton, postIndex) => {
          return (
            <a
              onClick={() => setSelectedToDisplay(postIndex)}
              className={`w-full ${bgColors.TERTIARY} h-full ${centerItem()} ${
                postIndex === selectedToDisplay
                  ? gradient(false, gradientColors.PRIMARY)
                  : bgColors.TERTIARY
              } flex-col ${buttonStyles("text-2xl lg:text-3xl")}`}
            >
              <IconComponent
                Icon={iconsData[feedData.postsKinds.icons[postIndex]]}
              />
              {`${specialTitle} ${titleButton}`}
            </a>
          );
        })}
      </div>
      <div className={`w-full h-[80%] overflow-y-scroll`}>
        {postsPollsData[selectedToDisplay] &&
        postsPollsData[selectedToDisplay].length > 0 ? (
          postsPollsData[selectedToDisplay]?.map((data, postIndex) => {
            return (
              <div
                key={`postsPollsDataDataSpecificIndex${postIndex}`}
                className={`w-[90%] m-auto h-[80%] overflow-y-auto ${centerItem()} relative shadow-[0_0_1rem_black] rounded-[20px] overflow-hidden flex-col bg-black/80 my-8 opacity-70`}
              >
                <>
                  <Dialog
                    classes={`w-full ${
                      openComments.postIndex === postIndex
                        ? "scale-1"
                        : "scale-0"
                    } h-[60%] bottom-[15%]`}
                    specificToggle={openComments.shouldOpen}
                  >
                    {
                      <CommentsData
                        selectedToDisplay={selectedToDisplay}
                        loadComments={openComments}
                        handleComment={handleComment}
                        data={data}
                        clickedPost={
                          postsPollsData[selectedToDisplay][
                            openComments.postIndex
                          ]
                        }
                      />
                    }
                  </Dialog>
                  <div className={`w-full relative`}>
                    <ProfileNameTitle
                      num={1}
                      endpoint={{
                        delete: `${
                          selectedToDisplay === 0
                            ? `/posts/deletePost/${data._id}`
                            : `/polls/deletePoll/${data._id}`
                        } `,
                        patch: `${
                          selectedToDisplay === 0
                            ? `/posts/updatePost/${data._id}`
                            : `polls/updatePoll/${data._id}`
                        }`,
                      }}
                      normalize={selectedToDisplay === 0 ? "EditPost" : "Poll"}
                      neededIndex={selectedToDisplay}
                      openComments={openComments.shouldOpen}
                      data={data}
                      dataType={"sectionsData"}
                    />
                    <h1
                      className={`text-start bg-black p-4 w-full h-fit leading-6 ${titleStyles(
                        data.Textarea && data.Textarea.length > 35
                          ? "text-[.7rem]"
                          : "text-[.7rem] lg:text-[1.2rem]"
                      )} text-white/60`}
                    >
                      {data.Textarea
                        ? data.Textarea
                        : data.Question_1[data.Question_1.length - 1] !== "?"
                        ? data.Question_1 + "?"
                        : data.Question_1}
                    </h1>
                  </div>
                  {data.image ? (
                    <img
                      className={`w-full h-[60%]`}
                      src={data.image.Upload}
                      alt={data.image.Alt}
                    />
                  ) : (
                    <div
                      className={`w-[90%] h-[60%] rounded-full ${centerItem(
                        "justify-evenly"
                      )} gap-2 flex-col`}
                    >
                      {data.Answers.map((answer, index) => {
                        return (
                          <h1
                            onClick={() =>
                              setCorrectBorder((prev) => ({
                                rightAnswer: data.rightAnswer,
                                shouldReset: !prev.shouldReset,
                                postIndex: postIndex,
                                answeredPosts: [
                                  ...prev.answeredPosts,
                                  postIndex,
                                ],
                              }))
                            }
                            className={`w-full h-[20%] shadow-lg shadow-black ${
                              data.rightAnswer === index + 1 &&
                              correctBorder.answeredPosts.includes(postIndex)
                                ? "border-b-4 border-green-500/70 tShadow"
                                : !correctBorder.answeredPosts.includes(
                                    postIndex
                                  )
                                ? ""
                                : `border-b-4 border-red-500/70 ${textColors.DENY}`
                            } ${
                              index % 2 === 0
                                ? bgColors.PRIMARY
                                : bgColors.SECONDARY
                            } ${centerItem()} hover:bg-black/30 transition-all cursor-pointer`}
                            key={`dataPollAnswers${index}`}
                          >
                            {answer}
                          </h1>
                        );
                      })}
                    </div>
                  )}
                  <FeedInteractions
                    postIndex={postIndex}
                    shouldOnlyLike={false}
                    postKind={postKind[selectedToDisplay]}
                    data={data}
                    handleComment={(i) => handleComment(i, postIndex)}
                  />
                </>
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

export default SectionsData;
