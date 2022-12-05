import faker from "@faker-js/faker";
import { prisma } from "@/config";
import { createUser } from "./users-factory";

//Sabe criar objetos - Hotel do banco
export async function createBooking(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      userId,
      roomId
    }
  });
}

export async function createManyBookings(roomId: number) {
  const user = await createUser();
  return prisma.booking.createMany({
    data: [{
      userId: user.id,
      roomId: roomId
    },
    {
      userId: user.id,
      roomId: roomId
    },
    {
      userId: user.id,
      roomId: roomId
    },]
  });
}
