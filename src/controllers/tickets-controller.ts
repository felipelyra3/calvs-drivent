import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/tickets-service";
import httpStatus from "http-status";

export async function GetTickets(req: AuthenticatedRequest, res: Response) {
  try {
    const tickets = await ticketsService.GetTicketService();
    return res.status(httpStatus.OK).send(tickets);
  } catch (error) {
    return res.sendStatus(httpStatus.UNAUTHORIZED); 
  }
}
