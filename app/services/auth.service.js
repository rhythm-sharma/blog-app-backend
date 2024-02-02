import httpStatus from "http-status";
import db from "../models/index.js";

const User = db.user;

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const saveUser = async (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((existingUser) => {
      if (existingUser) {
        // If email exists, update the existing entry with the request body
        return existingUser.update(req.body);
      } else {
        // If email doesn't exist, create a new entry with the request body
        return User.create(req.body);
      }
    })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(httpStatus.BAD_REQUEST).send({
        message: error,
      });
    });
};

export default {
  saveUser,
};
