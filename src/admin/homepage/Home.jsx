import React, { useEffect, useState } from 'react'
import './home.css'
import Cart from '../cart/Cart'
import axios from 'axios'
function Home() {

  const [seeds,setSeeds]=useState([])

  useEffect(()=>{
    getSeedsData()
  },[])

  const token=localStorage.getItem("tokens")

  const getSeedsData=async()=>{
    try{
      const response=await axios.get('http://localhost:8080/api/getAllData', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setSeeds(response.data)
    }catch(err){
      console.log(err)
    }
  }

  const removeItem=async(id)=>{
    try{
        const response= await axios.delete(`http://localhost:8080/api/removeData/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const updatedData = seeds.filter(data => data.id !== id);
        setSeeds(updatedData);
    }catch(err){
        console.log(err)
    }
}
  return (
    <div className='home'>
        <h1>Product Details</h1>
        <div className='cart-content'>
        {seeds.map((data, index) => (
        <Cart key={index} seeds={data} func={removeItem}/>
      ))}

            
          
        </div>
    </div>
  )
}

export default Home