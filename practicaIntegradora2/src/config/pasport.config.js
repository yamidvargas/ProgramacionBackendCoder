import passport from "passport";
import passportJwt from "passport-jwt";
import passportLocal from "passport-local";
import userModel from "../models/user.models.js";
import { cookieExtractor } from "../utils/jwt.js";
import userService from "../services/user.services.js";
const JWT_SECRET = 'myCookieCoder';
const JwtStrategy = passportJwt.Strategy;
const JwtExtractor = passportJwt.ExtractJwt;
const LocalStrategy = passportLocal.Strategy;
const { userRegistration, userLogin } = userService;
const initializePassport = () => {
    passport.use("register", new LocalStrategy({
        passReqToCallback: true,
        usernameField: "email",
    }, (req, username, password, done) => userRegistration(req, username, password, done)));
    passport.use("login", new LocalStrategy({
        usernameField: "email",
    }, (username, password, done) => userLogin(username, password, done)));
    passport.use("jwt", new JwtStrategy({
        jwtFromRequest: JwtExtractor.fromExtractors([cookieExtractor]),
        secretOrKey: JWT_SECRET,
    }, async (jwt_payload, done) => {
        try {
            console.log(jwt_payload);
            return done(null, jwt_payload);
        }
        catch (error) {
            console.log(error);
            return done(error);
        }
    }));
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id);
        done(null, user);
    });
};
export default initializePassport;
