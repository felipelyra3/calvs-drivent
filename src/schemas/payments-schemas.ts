import Joi from "joi";

export const paymentProcessSchema = Joi.object({
  ticketId: Joi.number().empty().min(1).required(),
  cardData: {
    issuer: Joi.string().max(255).required(),
    number: Joi.number().max(16).required(),
    name: Joi.string().max(255).required(),
    expirationDate: Joi.date().required,
    cvv: Joi.number().min(3).max(3).required
  }
});
