

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const patientInfo = useSelector((store)=>store.appPatient.patient);
  const [text,setText] = useState("");

  useEffect(()=>{
    if(!patientInfo){
      setText("SignIn");
      
      return;
    }
   
    setText("SignOut");
    
  },[]);
  return (
 
    <nav className="bg-gray-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-white text-lg font-bold">Life Matters</div>
        <div className="md:hidden">
          <button onClick={toggleNavbar} className="text-white focus:outline-none">
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
        <div className={`md:flex md:items-center ${isOpen ? 'block' : 'hidden'}`}>
          <ul className="flex flex-col md:flex-row md:space-x-4">
            <li className="relative">
              <button
                onClick={toggleDropdown}
                className="text-white  px-4 focus:outline-none"
              >
                Departements
              </button>
              {dropdownOpen && (
                <ul className="absolute left-0 mt-2 w-48 bg-white rounded shadow-lg z-10">
                  <li>
                    <Link to="/departments/cardiology" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Cardiology</Link>
                  </li>
                  <li>
                    <Link to="/departments/nephrology" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Nephrology</Link>
                  </li>
                  <li>
                    <Link to="/departments/neurology" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Neurology</Link>
                  </li>
                  <li>
                    <Link to="/departments/pediatrics" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Pediatrics</Link>
                  </li>
                  <li>
                    <Link to="/departments/pulmonology" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Pulmonology</Link>
                  </li>
                  <li>
                    <Link to="/departments/generalmediceine" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">General Mediceine</Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link to={patientInfo? patientInfo.name :`/register`} className="text-white py-2 px-4">{text}</Link>
            </li>
            <li>
              <a href="#" className="text-white py-2 px-4">About</a>
            </li>
            <li>
              <a href="#" className="text-white py-2 px-4">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    
  );
};

export default Navbar;
