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

  const income = await request.json();

  try {
    await prisma.incomes.create({
      data: {
        userId: currentUser.id,
        description: income.description,
        date: income.date,
        category: income.category,
        amount: parseFloat(income.amount)
      }
    })
  } catch (err) { 
    return NextResponse.json({error: err}, {status: 500})
  }
  return NextResponse.json({income}, {status:201})
}