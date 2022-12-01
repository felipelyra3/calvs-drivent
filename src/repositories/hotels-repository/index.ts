import { prisma } from "@/config";

async function findManyHotels() {
  return prisma.hotel.findMany();
}

async function findFirstHotelRoomByHotelId(hotelId: number) {
  return prisma.hotel.findFirst({
    where: {
      id: hotelId
    },
    include: {
      Rooms: true
    }
  });
}

const hotelsRepository = {
  findManyHotels,
  findFirstHotelRoomByHotelId
};

export default hotelsRepository;
