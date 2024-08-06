'use client'

import getUserTransaction from '@/app/actions/getUserTransaction';
//https://www.tremor.so/docs/visualizations/donut-chart
import { DonutChart } from '@tremor/react'

interface DashboardProps {
  transactions: any
}

// Using the following for charts: https://www.tremor.so/docs/
const Dashboard: React.FC<DashboardProps> =  ({transactions}) => {
  //TODO: I think a seperate way to refine data into catergory/amount would be ideal for chart component
  // Or also filtering transcations between debits and credits and having those collections of data go into seperate charts
  

  // Convert incoming transaction data into a simplified dictionary 
  let dictionary = Object.fromEntries(transactions.map((item: { description: any; debitAmount: any; }) => [item.description, item.debitAmount]));

  // Function to convert dictionary to Object []
  const dictionaryToArrayofObjects = (dictionary: { [x: string]: any; }) => {
    return Object.keys(dictionary).map(key => ({
      key: key,
      value: dictionary[key]
    }))
  };
  // Convert simplified dictionary back to Object []
  const arrayofObjects = dictionaryToArrayofObjects(dictionary)
  console.log("Object[] : ", arrayofObjects)

  return ( 
    <div>
      <DonutChart
        data={arrayofObjects}
        index="key"
        colors={[        'blue-900',        'blue-800',        'blue-700',        'blue-600',        'blue-500',        'blue-400',      ]}
      />
    </div>
  );
}
 
export default Dashboard;