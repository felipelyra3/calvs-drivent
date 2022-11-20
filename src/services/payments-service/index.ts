import paymentsRepositories from "@/repositories/payments-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketsRepositories from "@/repositories/tickets-repository";
import { notFoundError, requestError, unauthorizedError } from "@/errors";
import { Payment, Ticket } from "@prisma/client";

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

async function PostPaymentProcess(paymentData: PaymentData, userId: number) {
  const ticket = await ticketsRepositories.findFirstTicketsById(paymentData.ticketId);

  if(!ticket) {
    throw notFoundError();
  }

  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if(enrollment.id !== ticket.enrollmentId) {
    throw unauthorizedError();
  }

  const payment: Omit<Payment, "id"> = {
    ticketId: paymentData.ticketId,
    value: ticket.TicketType.price,
    cardIssuer: paymentData.cardData.issuer,
    cardLastDigits: paymentData.cardData.number.toString().slice(-4),
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const paymentProcess = await paymentsRepositories.createPaymentProcess(payment);

  await ticketsRepositories.updateStatus(paymentData.ticketId);
  
  return paymentProcess;
}

export type PaymentData = {
  ticketId: number,
	cardData: {
		issuer: string,
    number: number,
    name: string,
    expirationDate: Date,
    cvv: number
  }
}

const paymentService = {
  GetPaymentsByTicketId,
  PostPaymentProcess
};

export default paymentService;
