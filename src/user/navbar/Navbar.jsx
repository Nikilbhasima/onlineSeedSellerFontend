import React, { useContext } from 'react'
import img from '../../assets/coriander.jpg'
import './navbar.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../ProviderContext/AuthProvider'
function Navbar() {
  const {isLogin,setIsLogin}=useContext(AuthContext)
  const manageLocalStorage=()=>{
    localStorage.clear()
    window.location.reload()
  }
  return (
    <div className='nav_container'>
        <img src={img} alt="" className='logo' />
        <ul className='link_list'>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/order'>Order</Link></li>
          <li><Link to='/history'>History</Link></li>
        </ul>
        {isLogin===false?(<div className="buttons">
          
          <button><Link to='/login'>Login</Link></button>
          <button><Link to='/register'>Register</Link></button>
        </div>):(
          <div className="buttons">
    
          <button onClick={manageLocalStorage}>Logout</button>
        </div>
        )}
        
    </div>
  )
}

export default Navbar