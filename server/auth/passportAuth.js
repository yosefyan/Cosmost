import passport from "passport";
import Strategy from "passport-google-oauth2";
import User from "../models/MongoDB/Collections/Schemas/Users.js";
import {
  createInstance,
  getInstance,
} from "../models/MongoDB/Collections/dynamicService.js";
import envAdapter from "../helpers/envAdapter.js";

envAdapter();

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new Strategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.REDIRECT_URI,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      const searchUser = await getInstance({
        collectionType: User,
        identifier: "Email",
        value: profile.emails[0].value,
      });
      if (searchUser.length > 0) {
        return done(null, searchUser[0]);
      } else {
        createInstance({
          collectionType: User,
          data: {
            Email: profile.emails[0].value,
            userData: {
              Username: profile.name.givenName,
              Profile_Picture: profile.photos[0].value,
              Alt: "Google picture",
              Rank: "Cosmic",
            },
            Friends: [],
            moneyData: {
              coins: 20000,
              gems: 25000,
            },
            ownedStuff: {
              titles: [],
              pets: [],
              ranks: [],
            },
          },
        });
        return done(null, "done");
      }
    }
  )
);
