import React from 'react'
import './navbar.css'
import { NavLink } from 'react-router-dom'

function Navbar() {

  const clearLocalStorage=()=>{
    localStorage.clear()
    window.location.reload()
  }
  return (
    <div className='navbarMain'>
        <div className='logoBack'>
        <p className='logo'>logo</p>
        </div>
        <div className='nav-links'>
            <ul>
                <li>
                  <NavLink to='/'> Products</NavLink>
                 </li>
                <li><NavLink to='/order'> Orders</NavLink></li>
                <li><NavLink to='/purchase'> Purchases</NavLink></li>
                <li>
                  <NavLink to='/addProduct'>Add Product</NavLink>
                  </li>
            </ul>
            <button onClick={clearLocalStorage}>LogOut</button>
        </div>
    </div>
  )
}

export default Navbar