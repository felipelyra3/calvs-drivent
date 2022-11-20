import paymentsRepositories from "@/repositories/payments-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketsRepositories from "@/repositories/tickets-repository";
import { notFoundError, requestError, unauthorizedError } from "@/errors";
import { Ticket } from "@prisma/client";

async function GetPaymentsByTicketId(ticketId: number, userId: number) {
  if(!ticketId) {
    throw requestError(400, "BAD REQUEST");
  }
  const ticket = await ticketsRepositories.findFirstTicketsById(ticketId);

  if(!ticket) {
    throw notFoundError();
  }

  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if(enrollment.id !== ticket.enrollmentId) {
    throw unauthorizedError();
  }

  const payment = await paymentsRepositories.findFirstPaymentByTicketId(ticketId);
  
  return payment;
}

/* async function PostPaymentProcess(body) {
  const paymentProcess = await paymentsRepositories.createPaymentProcess(body);
  
} */

const paymentService = {
  GetPaymentsByTicketId,
  //PostPaymentProcess
};

export default paymentService;
