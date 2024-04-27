import { Strategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import { User } from '../models/users.js';
import dotenv from 'dotenv';

dotenv.config();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const strategy = new Strategy(options, async (payload, done) => {
  try {
    const user = await User.findOne({ email: payload });
    if (user) {
      return done(null, user);
    } else {
      return done({ status: 401, message: 'Unauthorized' }, false);
    }
  } catch (error) {
    return done(error, false);
  }
});

passport.use(strategy);

export const privateRoute = (req, res, next) => {
  const authFunction = passport.authenticate('jwt', (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    req.user = user;
    next();
  });
  authFunction(req, res, next);
};
