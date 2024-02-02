import Joi from "joi";

const login = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    profileImage: Joi.string().optional().allow(""),
  }),
};

export default { login };
