'use client'

import Container from "../Container"

interface TransactionItemProps {
  description: string
  date: Date
  debitAmount?: number
  creditAmount?: number
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  description,
  date,
  debitAmount,
  creditAmount
}) => {


  return (
    <tbody className="bg-slate-100">
      <tr>
        <td className="pl-10">{description}</td>
        <td>{date.toDateString()}</td>
        <td>{debitAmount}</td>
        <td>{creditAmount}</td>
      </tr>
    </tbody>
  )
}

export default TransactionItem;