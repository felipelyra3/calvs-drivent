import { AuthenticatedRequest } from "@/middlewares";
import ticketService from "@/services/tickets-service";
import hotelsService from "@/services/hotels-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  try {
    const hotels = await hotelsService.getHotels();
    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    if (error.name === "RequestError") {
      return res.status(httpStatus.PAYMENT_REQUIRED).send(error);
    }
    if (error.name === "ForbiddenError") {
      return res.status(httpStatus.FORBIDDEN).send(error);
    }
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
  return res.sendStatus(httpStatus.NO_CONTENT);
}

export async function getRooms(req: AuthenticatedRequest, res: Response) {
  try {
    const rooms = await hotelsService.getRooms(req.body.userId, Number(req.params.hotelId));
    return res.status(httpStatus.OK).send(rooms);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    if (error.name === "RequestError") {
      return res.status(httpStatus.PAYMENT_REQUIRED).send(error);
    }
    if (error.name === "ForbiddenError") {
      return res.status(httpStatus.FORBIDDEN).send(error);
    }
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
  return res.sendStatus(httpStatus.NO_CONTENT);
}

