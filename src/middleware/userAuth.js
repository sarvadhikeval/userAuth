import passport from 'passport'
import {Strategy,ExtractJwt} from 'passport-jwt'
import User from '../models/User.js';
import { config } from 'dotenv';
config();



passport.use('userAuthorization',new Strategy({
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.JWT_SECRET
},async(user,done)=>{
    const findUser = await User.findByPk(user.id);
    if(findUser){
        return done(null,findUser)
    }
    return done(null,false);
}));

passport.serializeUser(async(user,done)=>{
    return done(null,user.id);
});

passport.deserializeUser(async(id,done)=>{
    const user = await User.findByPk(id);
    if(user) return done(null,user);
    return done(null,false)
});

export default passport;