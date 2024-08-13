import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
  request: Request
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error()
  }

  const expense = await request.json();

  try {
    await prisma.expenses.create({
      data: {
        userId: currentUser.id,
        description: expense.description,
        date: expense.date,
        category: expense.category,
        amount: parseFloat(expense.amount)
      }
    })
  } catch (err) { 
    return NextResponse.json({error: err}, {status: 500})
  }
  return NextResponse.json({expense}, {status:201})
}