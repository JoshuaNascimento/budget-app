import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
  request: Request
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const data = await request.json();

  
  try {
    const transaction = await prisma.transaction.create({
      data: {
        date: data.date,
        description: data.description,
        category: data.category,
        debitAmount: parseFloat(data.debitAmount),
        creditAmount: parseFloat(data.creditAmount),
        userId: currentUser.id
      }
    })
  } catch (error) { // Returning an error for some reason
    return NextResponse.json({ error: error }, {status: 500})
  }
  return NextResponse.json({ data }, { status: 201 })
}