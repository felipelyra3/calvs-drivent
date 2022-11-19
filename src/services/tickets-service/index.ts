import ticketsRepositories from "@/repositories/tickets-repository";
import enrollmentRepository from "@/repositories/enrollment-repository/index";
import { notFoundError, requestError } from "@/errors";
import { Ticket } from "@prisma/client";

async function GetTicketsTypeService() {
  const result = await ticketsRepositories.findManyTicketsTypes();
  return result;

  //return await ticketsRepositories.GetTickets();
}

async function GetTickets(userId: number) {
  const enrollmentId: number = (await enrollmentRepository.findWithAddressByUserId(userId)).id;
  const result = await ticketsRepositories.findUniqueTickets(enrollmentId);

  if(!result) {
    throw notFoundError();
  }

  return result;
}

async function PostTickets(userId: number, ticketTypeId: number) {
  if(!ticketTypeId) {
    throw requestError(400, "BAD REQUEST");
  }

  const enrollmentId: number = (await enrollmentRepository.findWithAddressByUserId(userId)).id;

  if(!enrollmentId) {
    throw notFoundError();
  }
  
  const body: Omit<Ticket, "id"> = {
    status: "RESERVED",
    ticketTypeId,
    enrollmentId,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const result = await ticketsRepositories.createTicket(body);
  
  return result;
}

const ticketsService = {
  GetTicketsTypeService,
  GetTickets,
  PostTickets
};

export default ticketsService;
