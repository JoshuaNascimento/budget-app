'use client'

import getUserTransaction from '@/app/actions/getUserTransaction';
//https://www.tremor.so/docs/visualizations/donut-chart
import { DonutChart } from '@tremor/react'
import Container from '../Container';

interface DashboardProps {
  transactions: any
}

// Using the following for charts: https://www.tremor.so/docs/
const Dashboard: React.FC<DashboardProps> =  ({transactions}) => {
  //TODO: I think a seperate way to refine data into catergory/amount would be ideal for chart component
  // Or also filtering transcations between debits and credits and having those collections of data go into seperate charts
  

  // Convert incoming transaction data into a simplified dictionary of expenses
  let expensesDictionary = Object.fromEntries(transactions.map((item: { description: any; debitAmount: any; }) => [item.description, item.debitAmount]));

  // Convert incoming transaction data into a simplified dictionary of expenses
  let incomesDictionary = Object.fromEntries(transactions.map((item: { description: any; creditAmount: any; }) => [item.description, item.creditAmount]));

  // Function to convert dictionary to Object []
  const dictionaryToArrayofObjects = (dictionary: { [x: string]: any; }) => {
    return Object.keys(dictionary).map(key => ({
      key: key,
      value: dictionary[key]
    }))
  };

  // Convert simplified expenses dictionary back to Object []
  const expensesArray = dictionaryToArrayofObjects(expensesDictionary)
  console.log("Object[] : ", expensesArray)

  // Convert simplified incomes dictionary back to Object []
  const incomesArray = dictionaryToArrayofObjects(incomesDictionary)

  return ( 
    <div className='grid grid-cols-3 gap-2'>
      <DonutChart
        data={expensesArray}
        index="key"
        colors={[        'blue-900',        'blue-800',        'blue-700',        'blue-600',        'blue-500',        'blue-400',      ]}
      />
      <DonutChart
        data={incomesArray}
        index="key"

      />
    </div>
  );
}
 
export default Dashboard;