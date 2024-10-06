import React from 'react'
import { Link } from 'react-router-dom'

const DepartmentBody = () => {
  const department = ["General Mediceine","Pulmonology","Pediatrics","Nephrology","Neurology","Cardiology"]
  const img_path = [
    "/img/Doctor/generalmediceine.jpg",
    "/img/Doctor/neurology.jpg",
    "/img/Doctor/pulmonology.jpg",
    "/img/Doctor/cardiology.jpg",
    "/img/Doctor/pediatrics.jpg",
    "/img/Doctor/nephroology.jpg"
  ];
  return (
    <div className='flex flex-col rounded-lg shadow-md border-spacing-0 w-[75%] mx-auto overflow-auto'>
        <h3 className='text-center font-bold text-2xl'>Departments</h3>
        
        <div className='flex justify-between px-2 py-2'>
           
            <div className='flex flex-col max-w-1/4 shadow-sm border mx-2  bg-gray-400'>
                <div className="w-full h-18">
                    <p className='text-center font-bold text-xl bg-gray-400 w-full px-2 '><Link to="/departments/generalmediceine">General Mediceine</Link></p>
                </div>
                <div className='w-full'>
                    <img src="/img/Doctor/generalmediceine.jpg" className='h-auto object-contain'></img>
                </div>
            </div>
            <div className='flex flex-col max-w-1/4 shadow-sm border mx-2  bg-gray-400'>
                <div className="w-full h-18">
                    <p className='text-center font-bold text-xl bg-gray-400 w-full px-2 '><Link to="/departments/pulmonology">Pulmonology</Link></p>
                </div>
                <div className='w-full'>
                    <img src="/img/Doctor/pulmonology.jpg" className='h-auto object-contain'></img>
                </div>
            </div>
            <div className='flex flex-col max-w-1/4 shadow-sm border mx-2  bg-gray-400'>
                <div className="w-full h-18">
                    <p className='text-center font-bold text-xl bg-gray-400 w-full px-2 '><Link to="/departments/cardiology">Cardiology</Link></p>
                </div>
                <div className='w-full'>
                    <img src="/img/Doctor/cardiology.jpg" className='h-auto object-contain'></img>
                </div>
            </div>
            <div className='flex flex-col max-w-1/4 shadow-sm border mx-2  bg-gray-400'>
                <div className="w-full h-18">
                    <p className='text-center font-bold text-xl bg-gray-400 w-full px-2 h-full'><Link to="/departments/pulmonology">Neurology</Link></p>
                </div>
                <div className='w-full'>
                    <img src="/img/Doctor/neurology.jpg" className='h-auto object-contain'></img>
                </div>
            </div>
            <div className='flex flex-col max-w-1/4 shadow-sm border mx-2  bg-gray-400'>
                <div className="w-full h-18">
                    <p className='text-center font-bold text-xl bg-gray-400 w-full px-2 h-full'><Link to="/departments/pediatrics">Pediatrics</Link></p>
                </div>
                <div className='w-full'>
                    <img src="/img/Doctor/pediatrics.jpg" className='h-auto object-contain'></img>
                </div>
            </div>
            <div className='flex flex-col max-w-1/4 shadow-sm border mx-2  bg-gray-400'>
                <div className="w-full h-18">
                    <p className='text-center font-bold text-xl bg-gray-400 w-full px-2 h-full'><Link to="/departments/nephrology">Nephrology</Link></p>
                </div>
                <div className='w-full'>
                    <img src="/img/Doctor/nephrology.jpg" className='h-auto object-contain'></img>
                </div>
            </div>
        </div>
       
        
    </div>
  )
}

export default DepartmentBody