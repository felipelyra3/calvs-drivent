import ticketsRepositories from "@/repositories/tickets-repository";
import enrollmentRepository from "@/repositories/enrollment-repository/index";
import { notFoundError } from "@/errors";

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

const ticketsService = {
  GetTicketsTypeService,
  GetTickets
};

export default ticketsService;
