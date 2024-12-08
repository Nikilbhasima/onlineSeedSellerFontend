import React, { useContext, useState } from "react";
import "./addProduct.css";
import { IoMdDownload } from "react-icons/io";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../ProviderContext/AuthProvider";



function AddProduct() {

  // const {token}=useContext(AuthContext)
  // console.log(token)
  const location=useLocation();
  const seedInfo = location.state?.seeds || {}; 
  console.log("hello",seedInfo)
  const [productDetail, setProductDetail] = useState({
    id: seedInfo?.id || null,
    name: seedInfo?.name || "",
    price: seedInfo?.price || 0,
    quantity: seedInfo?.quantity || 0,
    description: seedInfo?.description || "",
    img: seedInfo?.img || null,
    preview: seedInfo?.img ? `data:image/jpeg;base64,${seedInfo.img}` : null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductDetail((product) => ({ ...product, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64Data = reader.result.split(',')[1]; // Keep as base64
        setProductDetail((product) => ({
          ...product,
          img: base64Data, // Send base64 directly
          preview: URL.createObjectURL(file),
        }));
      };
    }
  };
  

  const   submitForm=async(e)=>{
    console.log("level1",productDetail)
    if(!productDetail.name || !productDetail.img || !productDetail.price || !productDetail.quantity || !productDetail.description){
      alert("Please Enter complete data")
      return;
    }
    const formData1 = {
      id: productDetail.id || null,
      name: productDetail.name,
      price: parseFloat(productDetail.price),
      quantity: Number(productDetail.quantity),
      description: productDetail.description,
      img:productDetail.img    
    };
    
    console.log("level 2",formData1)
    try{
      const token=localStorage.getItem("tokens")
      const response= await axios.post('http://localhost:8080/api/seedData',formData1, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      setProductDetail((product)=>({name:"",price:"",quantity:"",img:"",description: ""}))
    }catch(err){
      console.log(err)
    }
  }


  return (
    <div className="addProduct">
      <h1>Enter Product Details</h1>
      <div className="entry_form">
        <div className="img-section">
          <label
            className="upload-button"
            style={{
              backgroundImage: productDetail.preview
                ? `url(${productDetail.preview})`
                : "none",
            }}
          >
            {productDetail.preview ? "" : <IoMdDownload className="icon_img"/>}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </label>
          <p className="message">Click on Image to change/update Photo</p>
        </div>
        <div className="form">
          <h1>Enter Product Info</h1>
          <div className="input_fields">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={productDetail.name}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={productDetail.price}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={productDetail.quantity}
            onChange={handleInputChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={productDetail.description}
            onChange={handleInputChange}
          ></textarea>
          <button onClick={submitForm}>Submit</button>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
