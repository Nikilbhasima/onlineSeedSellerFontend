import React, { useEffect, useState } from 'react'
import './history.css'
import axios from 'axios'

function History() {
  const token=localStorage.getItem("tokens")
  const [purchaseData,setPurchaseData]=useState([])
  const getPurchaseData=async()=>{
    try{
      const response=await axios.get('http://localhost:8080/api/getPurchaseData',{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      console.log("this is purchase data",response.data)
      setPurchaseData(response.data)
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    getPurchaseData()
  },[])
  return (
    <div className='history_container'>
      <p className='history_heading'>History</p>

      <div className='history_list header'>
        <p>Image</p>
        <p>Name</p>
        <p>Quantity</p>
        <p>Price</p>
        <p>Order Date</p>
        <p>Location</p>
        <p>Total</p>
      </div>
      <div className='list_container'>
      {
        purchaseData.filter((data)=>data.status==="close").map((data)=>(
      <div className='history_list' key={data.id}>
        <p><img src={`data:image/jpeg;base64,${data.img}`} className='seed_image'/></p>
        <p>{data.name}</p>
        <p>{data.quantity}</p>
        <p>{data.totalPrice}</p>
        <p>{data.purchaseDate}</p>
        <p>{data.location}</p>
        <p>{data.totalPrice*data.quantity}</p>
      </div>
        ))
      }
      </div>


    </div>
  )
}

export default History