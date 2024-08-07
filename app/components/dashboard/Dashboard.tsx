'use client'

import getUserTransaction from '@/app/actions/getUserTransaction';
//https://www.tremor.so/docs/visualizations/donut-chart
import { DonutChart } from '@tremor/react'
import Container from '../Container';

interface DashboardProps {
  transactions: any,
  categories: any
}

// Using the following for charts: https://www.tremor.so/docs/
const Dashboard: React.FC<DashboardProps> =  ({transactions, categories}) => {
  console.log("CATS: ",categories)  

  // Convert incoming transaction data into a simplified dictionary of expenses
  let expensesDictionary = Object.fromEntries(transactions.map((item: { category: any; debitAmount: any; }) => [item.category, item.debitAmount]));

  // Convert incoming transaction data into a simplified dictionary of expenses
  let incomesDictionary = Object.fromEntries(transactions.map((item: { category: any; creditAmount: any; }) => [item.category, item.creditAmount]));

  // Function to convert dictionary to Object []
  const dictionaryToArrayofObjects = (dictionary: { [x: string]: any; }) => {
    return Object.keys(dictionary).map(key => ({
      key: key,
      value: dictionary[key]
    }))
  };

  // Convert simplified expenses dictionary back to Object []
  const expensesArray = dictionaryToArrayofObjects(expensesDictionary)

  // Convert simplified incomes dictionary back to Object []
  const incomesArray = dictionaryToArrayofObjects(incomesDictionary)

  return ( 
    <div className='grid grid-cols-2 gap-2'>
      <DonutChart
        data={expensesArray}
        index="key"
        key="expenses"
        colors={['blue-900', 'blue-800', 'blue-700', 'blue-600', 'blue-500', 'blue-400', ]}
      />
      <DonutChart
        data={incomesArray}
        index="key"
        key="income"
      />
    </div>
  );
}
 
export default Dashboard;