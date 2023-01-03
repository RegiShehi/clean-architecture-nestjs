import Joi from 'joi';

export const registerUserSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 1,
      tlds: { allow: ['com'] },
    })
    .required(),
  password: Joi.string().required(),
  firstName: Joi.string(),
  lastName: Joi.string(),
});
