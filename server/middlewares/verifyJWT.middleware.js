import jwt from "jsonwebtoken";
import {errorHandler} from "../utils/errorHandler.util.js";

export const verifyJWT = (req, res, next) => {

    const token = req.cookies.refreshToken || req.headers.authorization?.replace("Bearer ", "");

    if(!token) {
        return next(new errorHandler("No token provided", 401));
    }

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return next(new errorHandler("Forbidden", 403));
        }
        req.user = user;
        next();
    });
}