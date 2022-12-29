import Joi from 'joi';

export const createAuthorSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
});
