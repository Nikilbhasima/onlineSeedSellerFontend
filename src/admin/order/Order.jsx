import React, { useEffect, useState } from 'react'
import './order.css'
import axios from 'axios'
export default function Order() {
    const token=localStorage.getItem("tokens")
    const [orderDetail,setOrderDetail]=useState([])
    console.log(orderDetail)
    const getOrderS=async()=>{
        try{
            const response=await axios.get('http://localhost:8080/api/getPurchaseDetail',{
                headers: {
                    'Authorization': `Bearer ${token}`
                  }
            })
            setOrderDetail(response.data)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        getOrderS()
    },[])

    const confirmOrder=async(id)=>{
        try{
            const response=await axios.put(`http://localhost:8080/api/confirmOrder/${id}`,{},{
                headers: {
                    'Authorization': `Bearer ${token}`
                  }
            })
            alert("Order Confirmed")
            setOrderDetail((pre)=>(
                pre.map((data)=> data.id===id?{...data,status:"close"}:data)
               
            ))
        }catch(err){
            console.log(err)
        }
    }

  return (
    <div className='main-body'>
        <h1>Orders</h1>

        <div className="list_container">
        <div className='order_data header'>
                <p className='heading'>Image</p>
                <p className='heading'>Name</p>
                <p className='heading'>Location</p>
                <p className='heading'>Quantity</p>
                <p className='heading'>Price</p>
                <p className='heading'>Order Date</p>
                <p className='heading'>Total Price</p>
                <p className='heading'>Place Order</p>
            </div>

            {orderDetail.filter((data)=>data.status==="open").map((data)=>(
                <div className='order_data' key={data.id}>
                <img src={`data:image/jpeg;base64,${data.img}`} alt="coriander" className='seed_img' />
                <p className='orderData'>{data.name}</p>
                <p className='orderData'>{data.location}</p>
                <p className='orderData'>{data.quantity}</p>
                <p className='orderData'>Rs{data.totalPrice}</p>
                <p className='orderData'>{data.purchaseDate}</p>
                <p className='orderData'>Rs{data.totalPrice*data.quantity}</p>
                <button className='order_btn' onClick={()=>{confirmOrder(data.id)}}>Place Order</button>
                </div>
            ))}
           
            
        </div>
    </div>
  )
}
