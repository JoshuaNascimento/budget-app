import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import ClientsOnly from "./components/ClientsOnly";
import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Budget App",
  description: "App to help you budget",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientsOnly>
          <ToasterProvider />
          <RegisterModal />
          <Navbar />
        </ClientsOnly>
        {children}
      </body>
    </html>
  );
}
