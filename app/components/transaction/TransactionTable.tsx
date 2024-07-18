'use client'

import { useState } from "react";
import TransactionItem from "./TransactionItem"
import { Pagination } from "flowbite-react";
import { pages } from "next/dist/build/templates/app-page";

interface TransactionTableProps {
  transactions: any
}

const TransactionTable: React.FC<TransactionTableProps> = ({transactions}) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [transPerPage, setTransPerPage] = useState(15);

  const indexOfLastPost = currentPage * transPerPage;
  const indexOfFirstPost = indexOfLastPost - transPerPage;
  const currentPosts = transactions.slice(indexOfFirstPost, indexOfLastPost);

  const onPageChange = (page: number) => {setCurrentPage(page)}
  
  const getPageNumbers = () => {
    let num;
    for (num = 1; num <= Math.ceil(transactions.length / transPerPage) - 1; num++) { 

    }
    console.log("Pages: ", num)
    return num;
  }

  return (  
      <table className="
        w-full
        divide-y
        bg-slate-200
        items-center
        ">
        {/* Table Headers */} 
        <thead>
          <tr>
            <th>Description</th>
            <th>Category</th>
            <th>Date</th>
            <th>Debited</th>
            <th>Credited</th>
          </tr>
        </thead>
        {/* Table Entries */}
        {currentPosts?.map((item: any) => (
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

          <Pagination currentPage={currentPage} totalPages={getPageNumbers()} onPageChange={onPageChange}/>
      </table>
  );
}
 
export default TransactionTable;