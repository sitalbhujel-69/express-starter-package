import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyToken } from "../utils/jwt.js";

export const protectedAuth = asyncHandler(async(req, res, next) => {
  const {token} = req.cookies;
  if(!token){
    return res.sendStatus(401)
  }
  const decoded = await verifyToken(token);
  if(!decoded){
    return res.sendStatus(403)
  }
  req.user = decoded;
  next()
});
