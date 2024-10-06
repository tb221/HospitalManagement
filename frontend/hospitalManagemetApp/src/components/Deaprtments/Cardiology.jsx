import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import { CiSearch } from "react-icons/ci";
import toast, { Toaster } from 'react-hot-toast';
import Card from '../Card';
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux';
import { setDoctors } from '../../redux/doctorSlice';



const Cardiology = () => {
   //const [docInfo,setDocInfo] = useState(null);
   const dispatch = useDispatch();
    useEffect(()=>{
        const fetchdoctors = async()=>{
            const response = await axios.get("http://localhost:8080/api/v1/doctor/getdoctors",{
                params:{
                    department: "Cardiology"
                },
            });
            let i;
            let doctors=[];
            for(i=0;i<response.data.doctors.length;i++)
            {
                doctors.push({
                    name: response.data.doctors[i].name,
                    title:response.data.doctors[i].title,
                    coverImage:response.data.doctors[i].coverImage,
                    description:response.data.doctors[i].description,
                    department:response.data.doctors[i].department,
                    email:response.data.doctors[i].email,
                });
            }
            //setDocInfo(doctors);
            dispatch(setDoctors(doctors));
        }
        fetchdoctors();
    },[]);
    const docInfo = useSelector((store)=>store.app.doctors);
    const [searchVal,setSearchVal]=useState("");
    const [filterVal,setFilterVal] = useState(null);
    const handleSearch = (e)=>{
        setSearchVal(e.target.value);
            
    }
    const filteredResult = ()=>{
        
        console.log(docInfo);
    
        if(searchVal === "")
        {
            setFilterVal(null);
            return;
        }
        let i;
        let ans_list=[];
        for(i=0;i<docInfo.length;i++)
        {
            if(docInfo[i].name.toLowerCase().includes(searchVal.toLowerCase()))
            {
                ans_list.push(docInfo[i]);
            }
        }
        if(ans_list.length === 0)
        {
            toast("No Doctors available");
            setFilterVal(null);
            return;
        }
        setFilterVal(ans_list);
        return;
    }
    
  
 
  
    return (
    <>
        <Navbar />
        <div className='xsm:max-w-[98%] md:max-w-[75%] mx-auto my-28'>
            <div className='flex w-full px-4 '>
                <input placeholder="Search a Doctor..." className="shadow-lg w-full rounded-lg border-solid border-2 border-black placeholder:text-center" onChange={handleSearch} type="text"  ></input>
                <button onClick={filteredResult} className='rounded-lg bg-slate-200 border-black border-solid border-2'><CiSearch size="30px" /></button>
            </div>
        </div>
        
        {
            searchVal.length > 0 ? (filterVal ? (
                <div className='flex mx-auto flex-wrap max-w-[75%] py-2 bg-gray-200 shadow-lg rounded-md border'>
                { 
                     
                    
                    filterVal.map((doctor,index)=>(
                        <Card key={index} title={doctor.title} description={doctor.description} coverImage={doctor.coverImage} name={doctor.name} email={doctor.email}/>
                    )) 
                        
                }
                </div>
            ) : <Toaster />) :  (
                <div className='flex mx-auto flex-wrap max-w-[75%] py-2 bg-gray-200 shadow-lg rounded-md border'>
                { 
                    docInfo ?  
                    (
                        docInfo.map((doctor,index)=>(
                        <Card key={index} title={doctor.title} description={doctor.description} coverImage={doctor.coverImage} name={doctor.name} email={doctor.email}/>
                        ))) 
                        : 
                        <Toaster /> 
                }
                </div>
            )
        }
    </>
  )
}

export default Cardiology