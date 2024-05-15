const normalizeData = (data, userPayload) => {
  let {
    Profile_Picture,
    Alt,
    image,
    Upload,
    Question_1,
    rightAnswer,
    Rank,
    Username,
    Answers,
    Textarea,
    finalPicture,
    userData,
    selectedFile,
    ...rest
  } = data;

  return {
    Register: {
      ...rest,
      userData: {
        ...(Alt && Profile_Picture && Rank
          ? {
              Alt,
              Profile_Picture,
              Rank: userPayload ? userPayload.Rank : Rank,
            }
          : { ...data.userData }),
        Username,
      },
    },
    Profile: {
      ...rest,
      Username: userData?.Username,
      Alt: userData?.Alt,
      Profile_Picture: userData?.Profile_Picture,
      Rank: userData?.Rank,
    },
    Post: {
      ...rest,
      Textarea,
      image: {
        ...(Upload && {
          Upload: `http://localhost:5174/uploads/${selectedFile.name}`,
        }),
        Alt: "Post",
      },
    },
    Poll: {
      Question_1,
      Answers: Object.values(rest),
      rightAnswer,
    },
    Comment: {
      ...rest,
      userData: {
        Profile_Picture,
        Alt,
        Rank,
        Username,
      },
    },
    EditPost: {
      Textarea,
      ...(Upload && { image: { Upload, Alt: "Post" } }),
    },
    EditPoll: {
      Question_1,
      ...(Answers
        ? {
            Answer_1: Answers[0],
            Answer_2: Answers[1],
            Answer_3: Answers[2],
            Answer_4: Answers[3],
          }
        : { rightAnswer, ...rest }),
    },
    EditUsername: {
      userData: {
        Username,
        Rank,
        Alt,
        Profile_Picture,
      },
    },
    editComment: {
      Comment: data.Comment
    },
    editProfile: {
      userData: {
        Username: data?.Username,
        Alt: data?.Alt,
        Profile_Picture: data?.Profile_Picture,
        Rank: data?.Rank,
      },
      Bio: data?.Bio,
      Date_Of_Birth: data?.Date_Of_Birth,
    },
  };
};

export default normalizeData;
