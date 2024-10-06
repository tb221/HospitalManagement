import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
//import { setPatient } from '../redux/patientSlice';
import  { useNavigate }  from 'react-router-dom';
const Card = ({ title, description, coverImage, name, email}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  const patientInfo = useSelector((store)=>store.appPatient.patient);
  const getAppointment = () =>{
    console.log("Name is ",name);
    console.log("email is ",email);
    if(!patientInfo){
      navigate("/register");
      
      return;
    }
    toast.success(`appointment booked with ${name}`);
  }
  return (
    <div className="max-w-sm rounded overflow-hidden  shadow-lg bg-white mx-auto">
      <img className="w-full  h-48 md:h-56 object-contain" src={`${coverImage}`} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-md overflow-auto">{title}</p>
        {isExpanded && (
          <p className="text-gray-600 mt-2">{description}</p>
        )}
      </div>
      <div className="px-6 pb-2 flex flex-col text-center">
        <button 
          onClick={toggleExpanded}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {isExpanded ? 'Show Less' : 'Read More'}
        </button>
        
        <button 
            onClick={getAppointment}
            className="bg-green-500 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded my-2"
        >
            Book Appointment
        </button>
        
        
      </div>
    </div>
  );
};

export default Card;