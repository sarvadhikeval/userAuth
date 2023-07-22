import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import User from '../models/User.js';
import { config } from 'dotenv';
import Token from '../models/Token.js';
import errHelper from '../utils/errorHelpers.js';
import errorTypes from '../utils/errorTypes.js';
config();



passport.use('userAuthorization', new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    passReqToCallback: true
}, async (req, user, done) => {
    try {
        const findUser = await User.findByPk(user.id, {
            include: {
                model : Token,
                attributes : ['token']
            },
            attributes : ['id','username','email']
        });
        const userToken = findUser.Token?.token;
        const insertToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        if (userToken === insertToken) {
            return done(null, findUser);
        }
        const err = new errHelper(errorTypes.unauthorized,'Not valid token');

        return done(err, false);
    } catch (err) {
        console.log('err');
        return done(err, false);
    }
}));

passport.serializeUser(async (user, done) => {
    try {
        return done(null, user.id);
    } catch (err) {
        return done(err,false)
    }
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findByPk(id);
    if (user) return done(null, user);
    return done(null, false);
});

export default passport;