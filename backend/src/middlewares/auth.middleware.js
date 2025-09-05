import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";


export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies.token ||
      req.header("Authorization")?.replace("Bearer ", "");
      

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = decodedToken;
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid access token", error);
  }
});
