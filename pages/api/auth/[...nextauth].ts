import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcrypt';

import prisma from "@/app/libs/prismadb"

export const authOptions : AuthOptions = {
  adapter: PrismaAdapter(),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {label: 'email', type: 'text'},
        password: {label: 'password', type: 'password'},
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials')
        }

        const user = await prisma.user.findUnique({ // Search for the user in database using their email
          where: {
            email: credentials.email
          }
        });

        if (!user || !user?.hashedPassword) { // Determine if a user exists or if there was a login error
          throw new Error('Invalid credentials')
        }

        const isCorrectPassword = await bcrypt.compare( // Use bcrypt library to compare hashed password stored on db with the password given
          credentials.password,
          user.hashedPassword
        )

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials")
        }

        return user;  // If all validation is passed return user to the client
      }
    })
  ],
  pages: {
    signIn: '/',  // On error return user to '/' page
  }, 
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET
};

export default NextAuth(authOptions); // Export NextAuth with the options object we define in authOptions