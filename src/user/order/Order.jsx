import React, { useEffect, useState } from 'react'
import './order.css'
import coriander from '../../assets/coriander.jpg'
import axios from 'axios'
function Order() {
  const token=localStorage.getItem("tokens")
  const [purchaseData,setPurchaseData]=useState([])
  const [editId,setEditId]=useState(null)
  const [editData,setEditData]=useState({
    id:0,
    name:'',
    quantity:0,
    location:'',
    purchaseDate:'',
    totalPrice:0
  })

  const handleChangeData=(e)=>{
    const {name,value}=e.target
    setEditData((data)=>({...data,[name]:value}))
  }

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

  const handleCancelOrder=async(id)=>{
    try{
      const response=await axios.delete(`http://localhost:8080/api/cancelOrder/${id}`,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const updateData=purchaseData.filter((data)=>data.id!=id)
      setPurchaseData(updateData)
    }catch(err){
      console.log(err)
    }
  }

  const handleEditOrder=(id)=>{
    const data=purchaseData.find((data)=>data.id==id)
    setEditId(id)
    setEditData(data)
    console.log("this is going to be edited",data)
  }

  const handleCancelEdit=()=>{
    setEditId(null)
    setEditData(null)
  }

  const updatePurchase=async()=>{
    console.log("what is new",editData)
    try{
      const response=await axios.post(`http://localhost:8080/api/updatePurchase`,editData,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setPurchaseData((prevData) => 
        prevData.map((data) =>
          data.id === editData.id 
            ? { ...data, ...editData } 
            : data
        )
      );
      setEditId(null)
      setEditData({
        id:0,
        name:'',
        quantity:0,
        location:'',
        purchaseDate:'',
        totalPrice:0
      })
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    getPurchaseData()
  },[])
  return (
    <div className='order_container'>
      <p className='p1'>Your Current order</p>
      <div className='order_heading'> 
        
          <p className='pHead'>Image</p>
          <p className='pHead'>Name</p>
          <p className='pHead'>Quantity</p>
          <p className='pHead'>Price</p>
          <p className='pHead'>Order Date</p>
          <p className='pHead'>Location</p>
          <p className='pHead'>Total</p>
          <p className='pHead'>Action</p>
          <p className='pHead'>Action</p>
        </div>
      <div className='data'>
        {purchaseData.filter((data)=>data.status=="open").map((data,index)=>(
          data.id===editId?(<div className='order_detail' key={index}> 
            <img src={`data:image/jpeg;base64,${data.img}`} alt="" className='seed_image' />
            <p>{editData.name}</p>
            <p><input className='editInput' value={editData.quantity} type='number' onChange={handleChangeData} name='quantity'/></p>
            <p>{editData.totalPrice}</p>
            <p>{editData.purchaseDate}</p>
            <p><input className='editInput' value={editData.location} type='text' onChange={handleChangeData} name='location'/></p>
            <p>{editData.totalPrice*editData.quantity}</p>
            <button className='btn' onClick={handleCancelEdit} >Cancel</button>
            <button className='btn' onClick={updatePurchase}>Update</button>
          </div>):(<div className='order_detail' key={index}> 
            <img src={`data:image/jpeg;base64,${data.img}`} alt="" className='seed_image' />
            <p>{data.name}</p>
            <p>{data.quantity}</p>
            <p>{data.totalPrice}</p>
            <p>{data.purchaseDate}</p>
            <p>{data.location}</p>
            <p>{data.totalPrice*data.quantity}</p>
            <button className='btn' onClick={()=>handleCancelOrder(data.id)}>Cancel</button>
            <button className='btn' onClick={()=>handleEditOrder(data.id)}>Edit</button>
          </div>)
        ))
      }
        
      </div>
    </div>
  )
}

export default Order