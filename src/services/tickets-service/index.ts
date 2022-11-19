import ticketsRepositories from "@/repositories/tickets-repository";
import enrollmentRepository from "@/repositories/enrollment-repository/index";

async function GetTicketsTypeService() {
  const result = await ticketsRepositories.findManyTicketsTypes();
  return result;

  //return await ticketsRepositories.GetTickets();
}

async function GetTickets(userId: number) {
  const enrollmentId: number = (await enrollmentRepository.findWithAddressByUserId(userId)).id;
  const result = await ticketsRepositories.findUniqueTickets(enrollmentId);

  return result;
}

const ticketsService = {
  GetTicketsTypeService,
  GetTickets
};

export default ticketsService;
