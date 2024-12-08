import React from 'react'
import Navbar from './navbar/navbar'
import Home from './homepage/Home'
import Router from './Router'
import './adminPage.css'

function AdminPage() {
  return (
    <div className='homeContainer'>
        <Navbar/>
        <Router/>
    </div>
  )
}

export default AdminPage