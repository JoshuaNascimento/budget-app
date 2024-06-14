'use client'

interface TransactionTableProps {
  children: React.ReactNode
}

const TransactionTable: React.FC<TransactionTableProps> = ({children}) => {
  
  return (  
    <table className="
      w-full
      divide-y
      bg-slate-200
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
      {children}
    </table>
  );
}
 
export default TransactionTable;