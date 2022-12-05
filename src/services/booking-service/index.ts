import hotelRepository from "@/repositories/hotel-repository";
import bookingRepository from "@/repositories/booking-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { notFoundError } from "@/errors";
import { cannotListHotelsError } from "@/errors/cannot-list-hotels-error";
import { forbiddenError } from "@/errors";

async function verifyTicketAndEnrollments(userId: number) {
  //Tem enrollment?
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  //Tem ticket pago isOnline false e includesHotel true
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw notFoundError();
  }
}

async function getBooking(userId: number) {
  await verifyTicketAndEnrollments(userId);
  const bookings = await bookingRepository.findFirstBookingByUserId(userId);

  if (!bookings) throw notFoundError();

  return bookings;
}

async function postBooking(userId: number, roomId: number) {
  const checkBooking = await bookingRepository.findFirstBookingByUserId(userId);
  if(checkBooking) throw forbiddenError();

  const room = await bookingRepository.findFistRoomByRoomId(roomId);
  if(room.Booking.length >= room.capacity) throw forbiddenError();

  const newBooking = await bookingRepository.createNewBooking(userId, roomId);
  return newBooking;
}

async function putBooking(bookingId: number, roomId: number) {
  const checkBooking = await bookingRepository.findFirstBookingsByBookingId(bookingId);
  if(!checkBooking) throw notFoundError();

  const checkRoom = await bookingRepository.findFistRoomByRoomId(roomId);
  if(!checkRoom) throw notFoundError();
  if(checkRoom.Booking.length >= checkRoom.capacity) throw forbiddenError();
  
  const booking = await bookingRepository.updateBookingByBookingId(bookingId, roomId);
  return booking;
}

const bookingService = {
  getBooking,
  postBooking,
  putBooking
};

export default bookingService;
