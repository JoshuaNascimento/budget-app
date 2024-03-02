'use client'

import { Toaster } from 'react-hot-toast'

// To utalize third-party libraries with next we need to wrap them in a parent that is a client-side component
const ToasterProvider = () => {
  return ( 
    <Toaster />
   );
}
 
export default ToasterProvider;