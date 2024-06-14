'use client'

import useUpdateTransactionModal from "@/app/hooks/useUpdateTransactionModal"
import UpdateTransactionModal from "../modals/UpdateTransactionModal"


interface TransactionItemProps {
  description: string
  category: string
  date: Date
  debitAmount?: number
  creditAmount?: number
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  description,
  category,
  date,
  debitAmount,
  creditAmount
}) => {
  const updateTransactionModal = useUpdateTransactionModal();

  return (
    <tbody className="bg-slate-100 hover:cursor-pointer hover:bg-slate-200">
      <tr onClick={() => updateTransactionModal.onOpen({description, category,
        debitAmount, creditAmount
      })}>
        <td className="pl-10">{description}</td>
        <td>{category}</td>
        <td>{date.toDateString()}</td>
        <td>{debitAmount}</td>
        <td>{creditAmount}</td>
      </tr>
    </tbody>

  )
}

export default TransactionItem;