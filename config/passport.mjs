import { default as passportJwt } from 'passport-jwt';
import mongoose from 'mongoose';

import { USERS_MODEL } from '../models/Users';
import { secretOrKey } from './keys';
import { wrapper } from '../share/utility';

const { Strategy: JwtStrategy, ExtractJwt } = passportJwt;

const User = mongoose.model(USERS_MODEL);
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey
};

export default passport => {
  passport.use(
    new JwtStrategy(opts, async (jwtPayload, done) => {
      const [findErr, foundUser] = await wrapper(User.findById(jwtPayload.id));

      if (findErr || !foundUser) {
        console.log(findErr);
        return findErr, false;
      }

      return done(null, foundUser);
    })
  );
};
