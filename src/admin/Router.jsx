import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './homepage/Home'
import AddProduct from './addProduct/AddProduct'
import Order from './order/Order'
import Purchases from './purchases/Purchases'

function Router() {
  return (
    <>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/addProduct' element={<AddProduct/>}/>
        <Route path='/order' element={<Order/>}/>
        <Route path='/purchase' element={<Purchases/>}/>
    </Routes>
    </>
  )
}

export default Router