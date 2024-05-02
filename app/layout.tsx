import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import ClientsOnly from "./components/ClientsOnly";
import Navbar from "./components/navbar/Navbar";
import UploadModal from "./components/modals/UploadModal";
import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";
import ToasterProvider from "./providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Budge It",
  description: "App to help you budge your expenses",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser(); // Pull User if logged in
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientsOnly>
          <ToasterProvider />
          <UploadModal currentUser={currentUser}/>
          <RegisterModal />
          <LoginModal />
          <Navbar currentUser={currentUser}/>
        </ClientsOnly>
        {children}
      </body>
    </html>
  );
}
