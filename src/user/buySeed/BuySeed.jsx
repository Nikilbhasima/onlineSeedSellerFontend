import React, { useState } from 'react'
import './buySeed.css'
import coriander from '../../assets/coriander.jpg'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
function BuySeed() {

    const token=localStorage.getItem("tokens")
    const location=useLocation();
    const data=location.state?.seeds
    const [purchaseDetail,setPurchaseDetail]=useState({
        id:data?.id,
        price:data?.price,
        quantity:'',
        location:''
    })
    const handleChange=(e)=>{
        const {name,value}=e.target
        setPurchaseDetail((data)=>({...data,[name]:value}))
    }

    const purchaseSeed=async()=>{
        try{
            const response=await axios.post("http://localhost:8080/api/buySeed",purchaseDetail,{
                headers: {
                    'Authorization': `Bearer ${token}`
                  }
            })
            setPurchaseDetail((data)=>({...data,quantity:'',location:''}))
            alert("Purchase successfull")
        }catch(err){
            console.log(err)
        }
    }
  return (
    <div className='buy_seed_container'>
        <div className='bo'>
        <div className="img_box">
            <img src={`data:image/jpeg;base64,${data.img}`} alt="" className='display_img' />
        </div>
        <div className="product_detail">
            <p className='p1'>Product Detail</p>
            <p className='p2'>Description</p>
            <p>{data.description}</p>
            <p className='p2'>Price:<span>Rs{data.price}</span></p>
            <p className='p2'>Quantity</p>
            <input type="number" name='quantity' value={purchaseDetail.quantity} onChange={handleChange} />
            <p className='p2'>Location for delivery</p>
            <input type="text" name='location' value={purchaseDetail.location} onChange={handleChange} />
            <button className='btn' onClick={purchaseSeed}>Buy</button>
        </div>
        </div>
        
    </div>
  )
}

export default BuySeed