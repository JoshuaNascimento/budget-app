import { NextResponse } from 'next/server';

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function DELETE(
  request: Request,
) {

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response("Unauthorized", {status: 401})
    }
      const body = await request.json()

      const deleteTransaction = await prisma.transaction.findFirst({
        where: body
      })
      
      if (!deleteTransaction) {
        throw new Response("Transaction not found", {status: 400})
      }

      if (deleteTransaction.userId !== currentUser.id) {  // Check if session user and database user are the same
        throw new Response("You do not have permission for this deletion", {status: 403})
      }

      await prisma.transaction.delete({
        where: body
      })

      return new Response("Transaction Deleted")
    } catch (error: any) {
      return new Response(error.message, {status: 400})
  }
}