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

  // Extract body content from post request
  const data = await request.json();

  // Iterate over each entry in the CSV File
  data.forEach( async (item: any) => {

    // Deconstruct each entry in accordance with the database schema
    const body = {
      date: item[0],
      description: item[1],
      category: "",
      debitAmount: item[2],
      creditAmount: item[3],
    }
    
    // Use try-catch in to properly vet for any errors in the POST(prisma create) request
    try {
      // Create a transaction record using the current entry in the CSV
      const transaction = await prisma.transaction.create({
        data: {
          date: new Date(body.date),
          description: body.description,
          category: body.debitAmount ? "Other" : "Job", // Set default value to "Other" on expenses and Job on income
          debitAmount: parseFloat(body.debitAmount),
          creditAmount: parseFloat(body.creditAmount),
          userId: currentUser.id
        }
      })
    } catch (error) {
      return NextResponse.json({ error: error}, {status: 500})
    }
  })
  // Must return a response at the end of the POST process to communicate sucess with the client-side
  return NextResponse.json({ data }, {status: 201}) 
}