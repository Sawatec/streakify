// middleware/authMiddleware.js
exports.checkAuthHeader = (req, res, next) => {
    const headerAut = req.headers.authorization;
    if (!headerAut) {
        return res.status(401).json({ error: "authorization-header not found" });
    }
    next();
};