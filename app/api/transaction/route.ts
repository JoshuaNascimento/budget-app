import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
  request: Request
) {
  const currentUser = await getCurrentUser(); // Obtain current user

  if (!currentUser) { // Check if currentUser exists
    return NextResponse.error();
  }

  // Extract body from post request
  const data = await request.json();

  const body = {
    date: data[0],
    description: data[1],
    amount: data[2],
  }

  // Create one transaction record
  const transaction = await prisma.transaction.create({
    data: {
      date: new Date(body.date),
      description: body.description,
      amount: parseFloat(body.amount),
      userId: currentUser.id
    }
  });

  return NextResponse.json(transaction)
}