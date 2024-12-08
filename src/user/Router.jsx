import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './loginpage/Login'
import Register from './register/Register'
import Order from './order/Order'
import History from './history/History'
import Home from '../admin/homepage/Home'
import BuySeed from './buySeed/BuySeed'

function Router() {
  return (
    <Routes>
        <Route  path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/order' element={<Order/>}/>
        <Route path='/history' element={<History/>}/>
        <Route path='/buySeed' element={<BuySeed/>}/>
    </Routes>
  )
}

export default Router