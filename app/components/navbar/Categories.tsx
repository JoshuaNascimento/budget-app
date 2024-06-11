'use client'

import Container from "../Container"
import { FaChartPie } from "react-icons/fa";
import { TbFileDollar } from "react-icons/tb";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";


export const categories = [ // Collection of categories to display
  {
    label: 'Dashboard',
    route: '/',
    icon: FaChartPie,
    desciprtion: "View overall financial status"
  },
  {
    label: 'Transactions',
    route: '/transactions',
    icon: TbFileDollar,
    desciprtion: "View and edit transactions"
  },
]

const Categories = () => {
  const params = useSearchParams(); // Pull parameters from url
  const category = params?.get('category'); // Set category param to variable
  const pathname = usePathname();
  console.log("PATHNAME: ", pathname);

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
        justify-center
        gap-40
        overflow-x-auto
        "
      >
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            route={item.route}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
   );
}
 
export default Categories;