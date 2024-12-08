import React, { useState } from 'react'
import './register.css'
import axios from 'axios'
function Register() {
  const [formData,setFormData]=useState({
    username:'',
    phone_number:'',
    password:''
  })
  const handleChange=(e)=>{
    const {name,value}=e.target
    setFormData((data)=>({...data,[name]:value}))
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    console.log("this is form data",formData)
    try{
      const response=await axios.post('http://localhost:8080/api/setBuyerData',formData,{
        withCredentials: true, // Ensure credentials are sent with the request
    })
      console.log(response.data)
      if(response.data){
        alert("Registration successfull")
        setFormData({
          username:'',
          phone_number:'',
          password:''
        })
      }else{
        alert("login Fail")
      }

      console.log(response.data)
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className='register_container'>
      <div className="register_subCon">
        <p className='heading'>Registration Form</p>
        <form onSubmit={handleSubmit} className='register_form'>
          <input type="text" placeholder='Username' name='username' value={formData.username} onChange={handleChange} />
          <input type="text" placeholder='Phone Number' name='phone_number' value={formData.phone_number} onChange={handleChange} />
          <input type="password" placeholder='Password' name='password' value={formData.password} onChange={handleChange}/>
          <button type='submit'>Register</button>
        </form>
      </div>
    </div>
  )
}

export default Register