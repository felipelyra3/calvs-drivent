import { prisma } from "@/config";

async function findManyTicketsTypes() {
  return prisma.ticketType.findMany();
}

async function findUniqueTickets(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
    include: {
      TicketType: true,
    }
  });
}

const ticketsRepositories = {
  findManyTicketsTypes,
  findUniqueTickets
};

export default ticketsRepositories;
