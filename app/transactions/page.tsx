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
  return (
    <ClientsOnly>
      <TransactionTable>
      {transData?.map((item) => (
        <TransactionItem
          key={item.id}
          id={item.id}
          description={item.description}
          category={item.category}
          date={item.date}
          debitAmount={item.debitAmount || 0}
          creditAmount={item.creditAmount || 0}
        />
      ))}
      </TransactionTable>
    </ClientsOnly>
  )
}