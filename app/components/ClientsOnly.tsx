'use client'

import { useEffect, useState } from "react";

interface ClientsOnlyProps {
  children: React.ReactNode;
}

const ClientsOnly: React.FC<ClientsOnlyProps> = ({
  children,
}) => {

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  },[]);

  if (!hasMounted) return null;
  return ( 
    <>
    {children}
    </>
   );
}
 
export default ClientsOnly;