import { prisma } from "@/config";

async function findFistRoomByRoomId(roomId: number) {
  return prisma.room.findFirst({
    where: {
      id: roomId
    },
    include: {
      Booking: true
    }
  });
}

async function findFirstBookingByUserId(userId: number) {
  return prisma.booking.findFirst({
    select: {
      id: true,
      Room: true
    },
    where: {
      userId: userId
    }
  });
}

async function findFirstBookingsByBookingId(bookingId: number) {
  return prisma.booking.findFirst({
    where: {
      id: bookingId
    }
  });
}

async function createNewBooking(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      userId: userId,
      roomId: roomId
    }
  });
}

async function updateBookingByBookingId(bookingId: number, roomId: number) {
  return prisma.booking.update({
    data: {
      roomId: roomId
    },
    where: {
      id: bookingId,
    }
  });
}

const bookingRepository = {
  findFistRoomByRoomId,
  findFirstBookingByUserId,
  findFirstBookingsByBookingId,
  createNewBooking,
  updateBookingByBookingId
};

export default bookingRepository;
