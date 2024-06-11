'use client'

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { IconType } from "react-icons"
import queryString from 'query-string'
import { stringify } from "querystring"

interface CategoryBoxProps {
  icon: IconType
  route: string
  label: string
  selected?: boolean,
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  route,
  selected
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    
    router.push(route);
    
    /*
    let curerntQuery = {};  // Define empty query

    if (params) { // Check if params exists
      curerntQuery = queryString.parse(params.toString());  // Parse params into object
    }

    
    const updatedQuery: any = {
      ...curerntQuery,  // Spread current queries
      category: label // Update category param to label of category clicked
    }
      

    if (params?.get('category') === label) {  // Check if category clicked is already selected
      delete updatedQuery.category; // remove category param from query
    }

    const url = queryString.stringifyUrl({  // Generate url string
      url: '/', // Pathname
      query: updatedQuery // Newest query
    }, { skipNull: true }); // Skip all of the empty options
    
  
    router.push(url)  // Update url
    */

  }, [label, route, params, router]);

  return ( 
    <div
    onClick={handleClick}
    className={`
    flex
    flex-col
    items-center
    justify-center
    gap-2
    p-3
    border-b-2
    hover:text-neutral-800
    transition
    cursor-pointer
    ${selected? 'border-b-neutral-800' : 'border-transparent'}
    ${selected? 'text-neutral-800' : 'text-neutral-500'}
    `}
    >
      <Icon size={26}/>
      <div className="font-medium text-sm">
        {label }
      </div>
    </div>
   );
}
 
export default CategoryBox;