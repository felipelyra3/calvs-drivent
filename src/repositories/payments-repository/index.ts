import { prisma } from "@/config";
import { Ticket } from "@prisma/client";

async function findFirstPaymentByTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId
    }
  });
}

/* async function createPaymentProcess(body) {
  return prisma.payment.create({
    data: body
});
} */

const paymentsRepositories = {
  findFirstPaymentByTicketId,
  //createPaymentProcess
};

export default paymentsRepositories;
