import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { GetPayments } from "@/controllers/payments-controller";
import { validateBody } from "@/middlewares";
import { paymentProcessSchema } from "@/schemas/payments-schemas";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", GetPayments)
  .post("/process", validateBody(paymentProcessSchema));

export { paymentsRouter };
