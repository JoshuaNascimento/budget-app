import { useEffect, useState } from "react";
import getUserTransaction from "../actions/getUserTransaction";
import TransactionItem from "../components/transaction/TransactionItem";
import ClientsOnly from "../components/ClientsOnly";
import TransactionTable from "../components/transaction/TransactionTable";

export default async function TransactionsPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const transData = await getUserTransaction();
  console.log("First: ", transData[0])
  return (
    <ClientsOnly>
      <TransactionTable transactions={transData}/>
    </ClientsOnly>
  )
}