import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

export function Admin_login(){

    let backend_url= import.meta.env.VITE_BACKEND_URL;
    console.log('backend url is'+backend_url);
    const navigate=useNavigate();

    const[email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const[button,setButton]=useState("Login");


    async function handleLogin(e){
        setButton("Login in...");
        e.preventDefault();
        let response;
        try{
        response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/authentication/Adminlogin`,{
            email,
            password
        })
        if(response){
            const token=response.data.token;
            localStorage.setItem("adminToken","Bearer "+token);
            navigate('/admindashboard')
        }
      }catch(err){
        setButton("Login");
        console.log('inside catch');
        if(err.response){
            if(err.response.data.msg){
                console.log(err.response.data.msg);
                alert(err.response.data.msg)
    
         }
        }else{
            alert('Error while logging in..please try again after some time');
        }
        
       }
    }

return(
    <>
     <div className='h-screen bg-black p-2 flex justify-center'>
     <div className='flex justify-center items-center flex-col'>
        <h1 className='text-white mb-4 lg:text-3xl text-2xl font-bold'>Login As Admin</h1>
     <form className='bg-white h-1/2 lg:h-2/3 p-5 w-3/4 md:w-1/2  pt-5 rounded-lg  border-2 border-x-white lg:w-2/3'  autoFocus onSubmit={handleLogin}>
        <input className='border-2 border-black m-5 mb-8 p-2 w-5/6 rounded-md md:w-4/5' type="Email" placeholder="Email" onChange={(e)=>{
            setEmail(e.target.value);
        }} autoFocus autofill="false" required/>
        <input className='m-6 mb-8 p-2 w-5/6 border-2 border-black rounded-md md:w-4/5' type="password" placeholder="Password" onChange={(e)=>{
            setPassword(e.target.value);
        }} autoFocus autofill="false" required/>
        <div className='justify-center '>
        <button className='mx-6 p-2 rounded-md w-4/5 cursor-pointer bg-green-800 font-bold text-white  ' type="submit">{button}</button>
        </div>
        
     </form>
     </div>
     </div>
     </>
)}