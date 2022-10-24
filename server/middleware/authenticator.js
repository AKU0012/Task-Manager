import jwt from 'jsonwebtoken'
import { createCustomError } from "../errors/custom-error.js";

const authenticator = (req, res, next)=>{
    const authHeaders = req.headers.authorization;
    
    if (!authHeaders || !authHeaders.startsWith("Bearer")) {
        return next(createCustomError("Authentication Invalid", 401))
    }
    
    const token = authHeaders.split(" ")[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {userId: payload.userId}
        next();
    } catch (error) {
        return next(createCustomError("Authentication Invalid", 401))
    }

}

export default authenticator