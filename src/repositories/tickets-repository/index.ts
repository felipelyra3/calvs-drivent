import { prisma } from "@/config";

async function GetTickets() {
  return prisma.ticketType.findMany();
}

const ticketsRepositories = {
  GetTickets
};

export default ticketsRepositories;
