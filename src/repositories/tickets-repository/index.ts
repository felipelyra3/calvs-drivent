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

async function findFirstTicketsById(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId
    },
    include: {
      TicketType: true
    }
  });
}

async function updateStatus(id: number) {   
  return prisma.ticket.update({     
    where: { id },     
    data: { status: "PAID" },   
  }); 
}

const ticketsRepositories = {
  findManyTicketsTypes,
  findUniqueTickets,
  findFirstTicketsById,
  updateStatus,
  createTicket
};

export default ticketsRepositories;
