import jwt from "jsonwebtoken";
import passport from "passport";
const JWT_SECRET = "jwtcookieSecret";
const COOKIE_NAME = "cokieuserController";
export const generateToken = (user) => {
    const token = jwt.sign({ user }, JWT_SECRET, {
        expiresIn: "24h",
    });
    return token;
};
export const authToken = (req, res, next) => {
    const cookieName = COOKIE_NAME;
    const authCookie = req.cookies[cookieName];
    if (!authCookie) {
        return res.status(401).send({
            error: "Not Auth",
        });
    }
    jwt.verify(authCookie, JWT_SECRET, (error, credentials) => {
        if (error) {
            return res.status(403).send({
                error: "Not Authorized",
            });
        }
        req.user = credentials.user;
        next();
    });
};
export const cookieExtractor = (req) => {
    const token = req && req.cookies ? req.cookies[COOKIE_NAME] : null;
    return token;
};
export const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, (err, user, info) => {
            console.log(info);
            if (err)
                return next();
            if (!user)
                return res.status(400).render("loginRequired", { error: info });
            req.user = user;
            next();
        })(req, res, next);
    };
};
