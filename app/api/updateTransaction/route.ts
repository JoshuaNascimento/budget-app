import { NextResponse } from 'next/server';

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function PUT(
  request: Request
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const data = await request.json();
  console.log("Server: ", data)

  try {
    const transaction = await prisma.transaction.update({
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
  } catch (error) { // Also returning an error for some reason
    return NextResponse.json({ error: error}, {status: 500})
  }
  // 204: server sucessfully processed request but not returning content
  return NextResponse.json({ data }, { status: 200 }) 
}