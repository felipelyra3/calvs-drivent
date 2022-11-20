import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/tickets-service";
import httpStatus from "http-status";
import paymentService from "@/services/payments-service";

export async function GetPayments(req: AuthenticatedRequest, res: Response) {
  try {
    const payment = await paymentService.GetPaymentsByTicketId(Number(req.query.ticketId), req.userId);
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if(error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else if(error.name === "RequestError") {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    } else if(error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND); 
  }
}

export async function PostPaymentProcess(req: AuthenticatedRequest, res: Response) {
  try {
    const payment = await paymentService.PostPaymentProcess(req.body, req.userId);
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if(error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else if(error.name === "RequestError") {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    } else if(error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND); 
  }
}
