import { NextResponse } from 'next/server';

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextApiResponse } from 'next';

export async function PUT(
  request: Request,
) {

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response("Unauthorized", {status: 401})
    }

    const data = await request.json();

  
    const updateTransaction = await prisma.transaction.findFirst({
      where: {
        id: data.id
      }
    })

    if (!updateTransaction) {
      throw new Response("Transaction not found", {status: 400})
    }

    if (updateTransaction.userId !== currentUser.id) {
      throw new Response("You do not have permission for this update", {status: 403})
    }

    await prisma.transaction.update({
      where: {
        id: data.id
      },
      data: {
        date: data.date,
        description: data.description,
        category: data.category,
        debitAmount: parseFloat(data.debitAmount),
        creditAmount: parseFloat(data.creditAmount),
        userId: currentUser.id
      }
    })
    
    return new Response("Transaction Updated")
  } catch (error: any) {
    return new Response(error.message, {status: 400})
  }
}