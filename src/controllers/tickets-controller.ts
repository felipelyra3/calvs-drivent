import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/tickets-service";
import httpStatus from "http-status";

export async function GetTicketsTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketsTypes = await ticketsService.GetTicketsTypeService();
    return res.status(httpStatus.OK).send(ticketsTypes);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND); 
  }
}

export async function GetTickets(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketTypes = await ticketsService.GetTickets(req.userId);
    return res.status(httpStatus.OK).send(ticketTypes);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function PostTickets(req: AuthenticatedRequest, res: Response) {
  try {
    const ticket = await ticketsService.PostTickets(req.userId, req.body.ticketTypeId);
    return res.status(httpStatus.CREATED).send(ticket);
  } catch (error) {
    if(error.name === "RequestError") {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    } else if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
