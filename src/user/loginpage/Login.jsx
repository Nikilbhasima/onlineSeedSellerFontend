import React, { useContext, useState } from 'react'
import './login.css'
import { AuthContext } from '../../ProviderContext/AuthProvider'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
function Login() {
  const {isLogin,setIsLogin,token,setToken,role,setRole}=useContext(AuthContext)

  const [loginData,setLoginData]=useState({
    phone_number:'',
    password:''
  })

  const navigate=useNavigate()


  const login=async(e)=>{

    e.preventDefault()
    try{
      const response=await axios.post('http://localhost:8080/api/abc',loginData)
      console.log(response.data)
      setToken(response.data)
      setIsLogin(true)
      console.log("hel:",token)

      localStorage.setItem("tokens",response.data)
      
        const decoded=jwtDecode(response.data)
        setRole(decoded.role)
        localStorage.setItem("role",decoded.role)
        if(decoded.role=="admin"){
          window.location.reload()

        }
        if(decoded.role=="user"){
          // window.location.reload()
          navigate('/')
        }
        console.log(decoded.role)
        console.log(role)
    }catch(err){
      console.log(err)
    }
  }
  const handleChange=async(e)=>{
    const {name,value}=e.target
    setLoginData((data)=>({...data,[name]:value}))
  }
  return (
    <div className='loginBody'>
      <form className='loginForm' >
        <p className='pp'>Login Form</p>
        <input type="text" placeholder='Phone Number' value={loginData.phone_number} name='phone_number' onChange={handleChange} />
        <input type="password" placeholder='password' value={loginData.password} name='password' onChange={handleChange}/>
        <button onClick={login}>Login</button>
      </form>
    </div>
  )
}

export default Login