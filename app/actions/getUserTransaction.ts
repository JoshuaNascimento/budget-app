import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from "@/app/libs/prismadb"


export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getUserTransaction() {
  try {

    const session = await getSession();

    if (!session?.user) {
      return null;
    }

    const userTransaction = await prisma.transaction.findMany({
      where: {
        user: session.user
      }
    });

    return userTransaction;
  } catch (error: any) {
    return null;
  }
};