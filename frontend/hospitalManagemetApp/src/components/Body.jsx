import React from 'react'
import Navbar from './Navbar'
import Carousel from './Caraousel'
import DepartmentBody from './DepartmentBody'
import { Toaster } from 'react-hot-toast'


const Body = () => {
  return (
    <>
        
         <Navbar />
         
         <Carousel />
         <DepartmentBody />
         
    </>
   
  )
}

export default Body