'use client'

import useUpdateTransactionModal from "@/app/hooks/useUpdateTransactionModal"

interface TransactionItemProps {
  id: string
  description: string
  category: string
  date: Date
  debitAmount?: number
  creditAmount?: number
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  id,
  description,
  category,
  date,
  debitAmount,
  creditAmount
}) => {
  const updateTransactionModal = useUpdateTransactionModal();

  return (
    <tbody className="bg-slate-100 hover:cursor-pointer hover:bg-slate-200">
      <tr onClick={() => updateTransactionModal.onOpen({id, description, category, date,
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