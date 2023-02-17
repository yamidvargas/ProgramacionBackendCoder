const auth = (req, res, next) => {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user)
        return next();
    return res.status(401).render("errors");
};
export default auth;
