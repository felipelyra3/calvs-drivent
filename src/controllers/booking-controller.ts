import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import bookingService from "@/services/booking-service";
import httpStatus from "http-status";

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const booking = await bookingService.getBooking(Number(userId));
    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
  }
}

export async function postBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const roomId = Number(req.body.roomId);
  try {
    const booking = await bookingService.postBooking(Number(userId), roomId);
    return res.status(httpStatus.OK).send({ id: booking.id });
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else if (error.name === "ForbiddenError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    } 
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function putBooking(req: AuthenticatedRequest, res: Response) {
  const roomId = Number(req.body.roomId);
  const bookingId = Number(req.params.bookingId);
  try {
    const booking = await bookingService.putBooking(bookingId, roomId);
    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else if (error.name === "ForbiddenError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
  }
}
