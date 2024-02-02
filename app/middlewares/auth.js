import { decode } from "next-auth/jwt";
import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";

const extractToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
};

export const decodeToken = async (req) => {
  const token = extractToken(req);

  if (!token) {
    return null;
  }

  let decoded = {};

  try {
    decoded = await decode({
      token,
      secret: "secret",
    });
  } catch (error) {}

  return decoded;
};

const auth = () => async (req, res, next) => {
  return new Promise(async (resolve, reject) => {
    const token = extractToken(req);

    if (!token) {
      reject(new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate"));
    }

    try {
      await decode({
        token,
        secret: "secret",
      });
      resolve();
    } catch (error) {
      reject(new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate"));
    }
  })
    .then(() => next())
    .catch((err) => next(err));
};

export default auth;
