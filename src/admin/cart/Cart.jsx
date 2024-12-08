import React, { useContext } from 'react'
import './cart.css'
import coriander from '../../assets/coriander.jpg'
import { AuthContext } from '../../ProviderContext/AuthProvider'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
function Cart({seeds,func}) {
    // const {role,setRole}=useContext(AuthContext)
    const role=localStorage.getItem("role")
    const navigate=useNavigate()
    const handEdit=()=>{
        navigate('/addProduct',{state:{seeds}})
    }  
    const buySeed=()=>{
        navigate('/buySeed',{state:{seeds}})
    }
  return (

    <div className='cart-container'>
        <div className="img">
            <img src={`data:image/jpeg;base64,${seeds.img}`} alt={seeds.name} className='image-picture' />
        </div>
        <div className='description'>
        <p className='p1_0'>{seeds.name}</p>
            {role==="user"?<div className="info">
                <p className='p1'>Description</p>
                <p className='p2'>{seeds.description}</p>
            </div>:null}
           
            <div className="quantity">
                <p className='p3'><span>Price:Rs</span>{seeds.price}</p>
                <p className='p4'><span>Quantity:{seeds.quantity}</span></p>
            </div>
            <div className="buttons">
                {role==="user"?<button onClick={buySeed}>Purchase</button>:<div className='btns'><button onClick={handEdit}>Edit</button><button onClick={()=>func(seeds.id)}>Remove</button></div>}
                
            </div>
        </div>
    </div>
  )
}

export default Cart