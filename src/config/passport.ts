import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStatic } from 'passport';

import { SECRET } from '../config/constants';
import { database as DataSource } from '../config/databases';

import { Users } from '../modules/auth/entities';
// import User from '../modules/users/models';

export const passportStrategy = (passport: PassportStatic) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET,
  };
  // opts.issuer = 'accounts.examplesoft.com';
  // opts.audience = 'yoursite.net';
  passport.use(
    new Strategy(opts, async (jwt_payload, done) => {
      // console.log(jwt_payload.data._id);
      try {
        const user = await DataSource.getRepository(Users).findOneBy({
          id: Number(jwt_payload.data.id),
        });
        // const user = await User.findOne({ _id: jwt_payload.data._id });
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      } catch (error) {
        console.error(`findOne error--> ${error}`);
        return done(error, false);
      }
    }),
  );
};
