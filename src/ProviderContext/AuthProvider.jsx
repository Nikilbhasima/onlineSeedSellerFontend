import React, { createContext, useState } from 'react'

 export const AuthContext=createContext();

export function AuthProvider({children}) {
    const [isLogin,setIsLogin]=useState(false)
    const [role,setRole]=useState("user")
    const [token,setToken]=useState()
  return (
    <AuthContext.Provider value={{isLogin,setIsLogin,role,setRole,token,setToken}}>
        {children}
    </AuthContext.Provider>
  )
}

