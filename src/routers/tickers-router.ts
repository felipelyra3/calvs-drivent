import express from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { GetTicketsTypes, GetTickets } from "@/controllers/tickets-controller";

const ticketRouter = express();

ticketRouter
  .all("/*", authenticateToken)
  .get("/", GetTickets)
  .get("/types", GetTicketsTypes);

export { ticketRouter };
