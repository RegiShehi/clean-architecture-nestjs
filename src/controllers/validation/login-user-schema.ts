import Joi from 'joi';

const loginUserSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 1,
      tlds: { allow: ['com'] },
    })
    .required(),
  password: Joi.string().required(),
});

export default loginUserSchema;
