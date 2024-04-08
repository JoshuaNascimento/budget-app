'use client'

import Container from "../Container"
import { FaChartPie } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { GiPayMoney } from "react-icons/gi";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";


export const categories = [ // Collection of categories to display
  {
    label: 'Dashboard',
    icon: FaChartPie,
    desciprtion: "View overall financial status"
  },
  {
    label: 'Income',
    icon: GiReceiveMoney,
    desciprtion: "View income"
  },
  {
    label: 'Expenses',
    icon: GiPayMoney,
    desciprtion: "View expenses"
  },
]

const Categories = () => {
  const params = useSearchParams(); // Pull parameters from url
  const category = params?.get('category'); // Set category param to variable
  const pathname = usePathname();

  const isMainPage = pathname === '/';  // Boolean for if we are on the main page

  if (!isMainPage) {  // Check if we are on main page
    return null;
  }

  return ( 
    <Container>
      <div
        className="
        pt-4
        flex
        flex-row
        items-center
        justify-between
        overflow-x-auto
        border-t-2
        "
      >
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
   );
}
 
export default Categories;