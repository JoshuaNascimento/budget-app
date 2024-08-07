import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from "@/app/libs/prismadb"


export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getUserCategories() {
  try {

    const session = await getSession();

    if (!session?.user) {
      return null;
    }

    const userCategories = await prisma.budget.findFirst({
      where: {
        user: session.user
      },
      select: { category: true }
    });
    return userCategories?.category;
  } catch (error: any) {
    return null;
  }
};