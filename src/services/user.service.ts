import { User } from "@prisma/client";
import { prisma } from "../db/client";

export const getAll = async (): Promise<User[]> => {
  return await prisma.user.findMany({ orderBy: { id: "asc" } });
};

export const getById = async (id: number): Promise<User | null> => {
  return await prisma.user.findUnique({ where: { id } });
};

export const create = async (data: {
  name: string;
  email: string;
  password: string;
}): Promise<User> => {
  return await prisma.user.create({ data });
};

export const update = async (
  id: number,
  data: Partial<{ name: string; email: string; password: string }>
): Promise<User | null> => prisma.user.update({ where: { id }, data });

export const remove = async (id: number) => {
  await prisma.todo.deleteMany({ where: { userId: id } }); 
  return await prisma.user.delete({ where: { id } });
};