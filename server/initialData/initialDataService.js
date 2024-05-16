import envAdapter from "../helpers/envAdapter.js";
import uniqueNumber from "../helpers/uniqueNumber.js";
import Posts from "../models/MongoDB/Collections/Schemas/Posts.js";
import Users from "../models/MongoDB/Collections/Schemas/Users.js";
import {
  createInstance,
  getInstance,
} from "../models/MongoDB/Collections/dynamicService.js";

envAdapter();
const { UPLOAD_URL } = process.env;

const initialUsers = async () => {
  let users = [
    {
      Email: "Morda@gmail.com",
      Password: "$2a$10$Tq3AH1Z0uEHo7MKbqMaUPOufejlQ8j8/Qs1Pne9YeKcyqOQVX28NK",
      Repeat_Password:
        "$2a$10$Tq3AH1Z0uEHo7MKbqMaUPOufejlQ8j8/Qs1Pne9YeKcyqOQVX28NK",
      Bio: "fafaf fasfag sgjskgh skj hgkshgksd ghkgsdhkgjsh gkjsgds",
      userData: {
        Username: "Morda",
        Profile_Picture: `${UPLOAD_URL}/uploads/Morda.jpg`,
        Alt: "image of space",
        Rank: "Star",
      },
      moneyData: {
        coins: 2000,
        gems: 1000,
      },
      ownedStuff: {
        titles: [
          {
            leftPart: { imgSrc: "FaHandHoldingHeart" },
            topPart: { Name: "Friendly", Type: "Titles", Rarity: "COMMON" },
          },
        ],
        pets: [
          {
            leftPart: { imgSrc: "FaCat" },
            topPart: { Name: "Cat", Type: "Pets", Rarity: "COMMON" },
          },
          {
            leftPart: { imgSrc: "FaDog" },
            topPart: { Name: "Dog", Type: "Pets", Rarity: "COMMON" },
          },
        ],
        ranks: [
          {
            leftPart: { imgSrc: "FaStar" },
            topPart: { Name: "Star", Type: "Ranks", Rarity: "COMMON" },
          },
        ],
      },
      isAdmin: false,
    },
    {
      Email: "Michael@gmail.com",
      Password: "$2a$10$Tq3AH1Z0uEHo7MKbqMaUPOufejlQ8j8/Qs1Pne9YeKcyqOQVX28NK",
      Repeat_Password:
        "$2a$10$Tq3AH1Z0uEHo7MKbqMaUPOufejlQ8j8/Qs1Pne9YeKcyqOQVX28NK",
      Bio: "fafaf fasfag sgjskgh skj hgkshgksd ghkgsdhkgjsh gkjsgds",
      userData: {
        Username: "Michael",
        Profile_Picture: `${UPLOAD_URL}/uploads/Michael.jpg`,
        Alt: "image of space",
        Rank: "Cosmic",
      },
      moneyData: {
        coins: 5000,
        gems: 3000,
      },
      ownedStuff: {
        titles: [
          {
            leftPart: { imgSrc: "FaHandHoldingHeart" },
            topPart: { Name: "Friendly", Type: "Titles", Rarity: "COMMON" },
          },
        ],
        pets: [
          {
            leftPart: { imgSrc: "GiParrotHead" },
            topPart: { Name: "Parrot", Type: "Pets", Rarity: "COMMON" },
          },
          {
            leftPart: { imgSrc: "GiBee" },
            topPart: { Name: "Bee", Type: "Pets", Rarity: "RARE" },
          },
        ],
        ranks: [
          {
            leftPart: { imgSrc: "GiCosmicEgg" },
            topPart: { Name: "Cosmic", Type: "Ranks", Rarity: "RARE" },
          },
        ],
      },
      isAdmin: false,
    },
    {
      Email: "Mika@gmail.com",
      Password: "$2a$10$Tq3AH1Z0uEHo7MKbqMaUPOufejlQ8j8/Qs1Pne9YeKcyqOQVX28NK",
      Repeat_Password:
        "$2a$10$Tq3AH1Z0uEHo7MKbqMaUPOufejlQ8j8/Qs1Pne9YeKcyqOQVX28NK",
      Bio: "fafaf fasfag sgjskgh skj hgkshgksd ghkgsdhkgjsh gkjsgds",
      userData: {
        Username: "Mika",
        Profile_Picture: `${UPLOAD_URL}/uploads/Mika.jpg`,
        Alt: "image of space",
        Rank: "Universal",
      },
      moneyData: {
        coins: 10000,
        gems: 6000,
      },
      ownedStuff: {
        titles: [
          {
            leftPart: { imgSrc: "GiMagicPortal" },
            topPart: {
              Name: "4th Dimensioner",
              Type: "Titles",
              Rarity: "LEGENDARY",
            },
          },
          {
            leftPart: { imgSrc: "GiInterstellarPath" },
            topPart: {
              Name: "Interstellar",
              Type: "Titles",
              Rarity: "RARE",
            },
          },
          {
            leftPart: { imgSrc: "FaHandHoldingHeart" },
            topPart: { Name: "Friendly", Type: "Titles", Rarity: "COMMON" },
          },
        ],
        pets: [
          {
            leftPart: { imgSrc: "GiDolphin" },
            topPart: { Name: "Dolphin", Type: "Pets", Rarity: "LEGENDARY" },
          },
          {
            leftPart: { imgSrc: "FaSpaghettiMonsterFlying" },
            topPart: { Name: "Monster", Type: "Pets", Rarity: "LEGENDARY" },
          },
        ],
        ranks: [
          {
            leftPart: { imgSrc: "TbUniverse" },
            topPart: { Name: "Universal", Type: "Ranks", Rarity: "LEGENDARY" },
          },
        ],
      },
      isAdmin: true,
    },
  ];

  try {
    for (let user of users) {
      const isUserAdded = await getInstance({
        collectionType: Users,
        identifier: "Email",
        value: user.Email,
      });
      isUserAdded.length === 0 &&
        (await createInstance({
          collectionType: Users,
          data: user,
        }));
    }
  } catch (err) {
    throw new Error(err);
  }
  await initialPosts(users);
};

const initialPosts = async (users) => {
  for (let user of users) {
    const isUsersAdded = await getInstance({
      collectionType: Users,
      identifier: "email",
      value: user.email,
    });
    let posts = [
      {
        Textarea: "The sun of tel-aviv",
        image: {
          Upload:
            "https://images.unsplash.com/photo-1608178398319-48f814d0750c?q=80&w=1479&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          Alt: "image of something",
        },
        Likes: [],
        Comments: [],
        Shares: 0,
        user_id: await isUsersAdded[0]._id,
        userData: {
          Profile_Picture: "http://www.google.com",
          Alt: "image of space",
          Rank: "Universal",
          Username: "Morgen",
        },
      },
      {
        Textarea: "Going abroad, Italy is amazing!",
        image: {
          Upload:
            "https://images.unsplash.com/photo-1608178398319-48f814d0750c?q=80&w=1479&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          Alt: "image of something",
        },
        Likes: [],
        Comments: [],
        Shares: 0,
        user_id: await isUsersAdded[0]._id,
        userData: {
          Profile_Picture: "http://www.google.com",
          Alt: "image of space",
          Rank: "Universal",
          Username: "Mika",
        },
      },
      {
        Textarea: "Try these 3 life hacks today!",
        Likes: [],
        Comments: [],
        Shares: 0,
        image: {
          Upload:
            "https://images.unsplash.com/photo-1608178398319-48f814d0750c?q=80&w=1479&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          Alt: "image of something",
        },
        user_id: await isUsersAdded[0]._id,
        userData: {
          Profile_Picture: "http://www.google.com",
          Alt: "image of space",
          Rank: "Universal",
          Username: "Michael",
        },
      },
    ];
    try {
      for (let post of posts) {
        const isPostsAdded = await getInstance({
          collectionType: Posts,
          identifier: "Textarea",
          value: post.Textarea,
        });

        isPostsAdded.length === 0 &&
          (await createInstance({
            collectionType: Posts,
            data: post,
          }));
      }
    } catch (err) {
      throw new Error(err);
    }
  }
};

export { initialUsers, initialPosts };
