import ticketsRepositories from "@/repositories/tickets-repository";

async function GetTicketService() {
  const result = await ticketsRepositories.GetTickets();
  return result;

  //return await ticketsRepositories.GetTickets();
}

const ticketsService = {
  GetTicketService
};

export default ticketsService;
