import bcrypt from "bcryptjs"
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server";

export async function POST(
  request: Request 
)
  {
    const body = await request.json();
    const {
      email,
      name,
      password
    } = body;

    const hashedPassword = await bcrypt.hash(password, 12)  // Take user password and hash it

    const user = await prisma.user.create({ // Create new user in database
      data: {
        email,
        name,
        hashedPassword
      }
    });

    return NextResponse.json(user); // Return response
  }
