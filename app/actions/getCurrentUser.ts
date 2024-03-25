import { getServerSession  } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb"


export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {  // Check if user session exists
      return null;
    }

    const currentUser = await prisma.user.findUnique({  // Search Database using prisma to find user with provided email
      where: {
        email: session.user.email as string
      }
    });

    if (!currentUser) { // Check if user exists
      return null;
    }

    return currentUser; // Return user if exists
  } catch (error: any) {
    return null; // Not an API call rather a direct communication with server so do not throw errors
  }
}