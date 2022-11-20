import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { GetTicketsTypes, GetTickets, PostTickets } from "@/controllers/tickets-controller";

const ticketRouter = Router();

ticketRouter
  .all("/*", authenticateToken)
  .get("/", GetTickets)
  .post("/tickets", PostTickets)
  .get("/types", GetTicketsTypes);

export { ticketRouter };
