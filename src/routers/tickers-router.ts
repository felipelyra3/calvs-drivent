import express from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { GetTickets } from "@/controllers/tickets-controller";

const ticketRouter = express();

ticketRouter
  .all("/*", authenticateToken)
  .get("/types", GetTickets);

export { ticketRouter };
