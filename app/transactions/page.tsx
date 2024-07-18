import { useEffect, useState } from "react";
import getUserTransaction from "../actions/getUserTransaction";
import ClientsOnly from "../components/ClientsOnly";
import TransactionTable from "../components/transaction/TransactionTable";

export default async function TransactionsPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const transData = await getUserTransaction();

  return (
    <ClientsOnly>
      <TransactionTable transactions={transData}/>
    </ClientsOnly>
  )
}