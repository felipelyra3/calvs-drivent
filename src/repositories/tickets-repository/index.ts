import { prisma } from "@/config";
import { Ticket } from "@prisma/client";

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

async function createTicket(body: Omit<Ticket, "id">) {
  return prisma.ticket.create({
    data: body,
    include: {
      TicketType: true
    }
  });
}

const ticketsRepositories = {
  findManyTicketsTypes,
  findUniqueTickets,
  createTicket
};

export default ticketsRepositories;
