import { Pets, Ranks, Titles } from "../pages/Shop/shopSections";

const shopData = {
  sideNav: {
    titles: ["Ranks", "Pets", "Titles"],
    icons: ["GiPlanetConquest", "MdOutlinePets", "MdTitle"],
  },
  topNav: {
    titles: ["Coins", "Gems"],
    icons: ["FaCoins", "LiaGemSolid"],
  },
  shopFiles: [Ranks, Pets, Titles],
  rarityData: {
    common: ["Star", "Dog", "Cat", "Parrot", "Destroyer", "Friendly"],
    rare: ["Cosmic", "Snail", "Bee", "Interstellar"],
    legendary: ["Universal", "Dolphin", "Monster", "4th Dimensioner"],
  },
  shopDialog: {
    museumData: {
      lasers: Array(2).fill(""),
      tableParts: Array(3).fill(""),
    },
    titlesData: {
      icons: ["GiPlanetConquest", "MdOutlinePets", "MdTitle"],
    },
  },
  categoriesData: {
    Ranks: {
      titles: ["Star", "Cosmic", "Universal"],
      icons: ["FaStar", "GiCosmicEgg", "TbUniverse"],
      prices: [
        {
          Coins: 250,
          Gems: 250,
          Rarity: "COMMON",
        },
        {
          Coins: 800,
          Gems: 500,
          Rarity: "RARE",
        },
        {
          Coins: 1500,
          Gems: 1000,
          Rarity: "LEGENDARY",
        },
      ],
    },
    Pets: {
      titles: ["Dog", "Cat", "Parrot", "Snail", "Bee", "Dolphin", "Monster"],
      icons: [
        "FaDog",
        "FaCat",
        "GiParrotHead",
        "GiSnail",
        "GiBee",
        "GiDolphin",
        "FaSpaghettiMonsterFlying",
      ],
      prices: [
        {
          Coins: 250,
          Gems: 250,
          Rarity: "COMMON",
        },
        {
          Coins: 500,
          Gems: 250,
          Rarity: "COMMON",
        },
        {
          Coins: 500,
          Gems: 250,
          Rarity: "COMMON",
        },
        {
          Coins: 800,
          Gems: 500,
          Rarity: "RARE",
        },
        {
          Coins: 800,
          Gems: 500,
          Rarity: "RARE",
        },
        {
          Coins: 1500,
          Gems: 1000,
          Rarity: "LEGENDARY",
        },
        {
          Coins: 1500,
          Gems: 1000,
          Rarity: "LEGENDARY",
        },
      ],
    },
    Titles: {
      titles: ["Destroyer", "Friendly", "Interstellar", "4th Dimensioner"],
      icons: [
        "GiExplodingPlanet",
        "FaHandHoldingHeart",
        "GiInterstellarPath",
        "GiMagicPortal",
      ],
      prices: [
        {
          Coins: 250,
          Gems: 250,
          Rarity: "COMMON",
        },
        {
          Coins: 250,
          Gems: 250,
          Rarity: "COMMON",
        },
        {
          Coins: 800,
          Gems: 500,
          Rarity: "RARE",
        },
        {
          Coins: 1500,
          Gems: 1000,
          Rarity: "LEGENDARY",
        },
      ],
    },
  },
};

export default shopData;
