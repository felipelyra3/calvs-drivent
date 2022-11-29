import { notFoundError } from "@/errors";
import ticketRepository from "@/repositories/ticket-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { TicketStatus } from "@prisma/client";
import hotelsRepository from "@/repositories/hotels-repository";
import paymentRepository from "@/repositories/payment-repository";

async function getHotels() {
  const hotels = await hotelsRepository.findManyHotels();

  return hotels;
}

async function getRooms(userId: number, hotelId: number) {
  const rooms = await hotelsRepository.findFirstHotelRoomByHotelId(hotelId);

  return rooms;
}

const hotelsService = {
  getHotels,
  getRooms
};

export default hotelsService;
