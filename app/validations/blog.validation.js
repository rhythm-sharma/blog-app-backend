import Joi from "joi";

const create = {
  body: Joi.object().keys({
    title: Joi.string().optional().allow(""),
    content: Joi.any(),
    published: Joi.boolean().optional(),
    background: Joi.string().optional().allow(""),
  }),
};

const update = {
  body: Joi.object().keys({
    id: Joi.any(),
    title: Joi.string().optional().allow(""),
    content: Joi.any(),
    published: Joi.boolean().optional(),
    background: Joi.string().optional().allow(""),
  }),
};

const get = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

const remove = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

export default { create, update, get, remove };
