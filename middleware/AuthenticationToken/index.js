const jwt = require('jsonwebtoken');
const accessTokenSecret = 'rpb-secret-key';

function AuthenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    if(!authHeader) {
        next(new Error("Token not found"));
    }

    const token = authHeader.split(" ")[1];
    if(!token) {
        next(new Error("Token is required"));
    }

    const decoded = jwt.verify(token, accessTokenSecret);

    const user = {
        name: decoded.name,
        email: decoded.email,
    };

    req.user = user;

    next();
}