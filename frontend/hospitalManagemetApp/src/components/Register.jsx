import React, { useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPatient } from '../redux/patientSlice';
import toast from 'react-hot-toast';
import { setToken } from '../redux/tokenSlice';


const Register = () => {
  const [signup,setSignup] = useState(false);
  const [email,setEmail] = useState("");
  const [name,setName] = useState("");
  const [password,setPassword] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleState = ()=>{
    setSignup(!signup);
  }
  const sendInfo = async()=>{
    try{
        if(signup)
        {
            const data = {
                name:name,
                email:email,
                password:password
            };
            const resp = await axios.post("http://localhost:8080/api/v1/patient/signUp",data);
            if(resp.data.patient)
            {
                setSignup(!signup);
                toast.success("Sign Up Successfull");
                navigate("/register");
            }
        }
        else{
            console.log("Hi");
            const data = {
                email:email,
                password:password
            };
            const resp = await axios.post("http://localhost:8080/api/v1/patient/signin",data);
            console.log(resp.data);
            if(resp.data.patient && resp.data.token)
            {
                dispatch(setPatient(resp.data.patient));
                dispatch(setToken(resp.data.token))
                console.log(resp.data);
                toast.success("Sign In Successfull");
                navigate("/");
        
            }
        }
    }
    catch(error){
        return;
    }
  }
  return (
    <>
        <Navbar />
        <div className='sm:w-[100%] bg-black mx-auto my-40 flex max-w-md md:w-[55%] border shadow-md rounded-md border-x-fuchsia-50 bg-opacity-75'>
                <div className="sm:w-[100%] flex flex-col bg-white mx-w-md md:w-[55%] mx-auto p-2 bg-opacity-80">
                    <h3 className='text-center font-bold text-xl p-2'>{!signup ? "SignIn" : "SignUp"}</h3>
                    {signup && 
                    <input onChange={(e)=>setName(e.target.value)} className='mt-2 border border-black border-solid p-1 mb-2 rounded-sm shadow-sm' placeholder='Enter your Name ...'></input>}
                    <input onChange={(e)=>setEmail(e.target.value)} className='border border-black border-solid p-1 mb-2 rounded-sm shadow-sm' placeholder='Enter your Email ...'></input>
                    <input onChange={(e)=>setPassword(e.target.value)} className='border border-black border-solid p-1 mb-2 rounded-sm shadow-sm' placeholder='Enter your Password ...'></input>
                    <button onClick={sendInfo} className='sm:w-[45%] overflow-hidden text-]ellipsis max-w-md  text-bold text-lg my-2 px-1 p-2 rounded-sm shadow-sm bg-black text-white hover:bg-blue-400 md:w-[30%] mx-auto'>
                        {!signup ? "SignIn" : "SignUp"}
                    </button>
                    { !signup ? <p className='text-center font-md'>New User?<button onClick={handleState} className='text-blue-400 underline'>SignUp</button></p>
                    : <p className="text-center font-md">Already Registered?<button onClick={handleState} className='text-blue-400 underline'>SignIn</button></p>
                    }
                </div>
                
        </div>
        
    </>
  )
}

export default Register