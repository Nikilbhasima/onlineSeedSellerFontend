import { useContext, useState } from 'react'
import './App.css'
import { AuthContext } from './ProviderContext/AuthProvider'
import AdminPage from './admin/adminPage'
import UserPage from './user/UserPage'

function App() {
  // const {role,setRole}=useContext(AuthContext)

  const role=localStorage.getItem("role")
  return (
    <>
    {role==null&&<UserPage/>}
        {role==="user"&&<UserPage/>}
        {role==="admin"&&<AdminPage/>}
    </>

  )
}

export default App
