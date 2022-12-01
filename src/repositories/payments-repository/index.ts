import { prisma } from "@/config";
import { Payment, Ticket } from "@prisma/client";

async function findFirstPaymentByTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId
    }
  });
}

async function createPaymentProcess(payment: Omit<Payment, "id">) {
  return prisma.payment.create({
    data: payment
  });
} 

const paymentsRepositories = {
  findFirstPaymentByTicketId,
  createPaymentProcess
};

export default paymentsRepositories;
