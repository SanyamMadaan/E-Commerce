import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {jwtDecode}  from "jwt-decode";
import { addToCartFunction } from "../Common/addToCartFunction";

export function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const addToCart=addToCartFunction(); 

  const getProducts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products/`);
      setProducts(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProducts();
  }, []); // Empty dependency array ensures this runs only once

  function Logout() {
    console.log("inside logout");
    let Isconfirm = confirm("Are you sure for Log out");
    if (Isconfirm) {
      localStorage.removeItem("token");
      navigate("/");
    }
  }

  
  function Card(props) {
    return (
      <div
        key={props.id}
        className="bg-white flex flex-col m-2 p-2  h-min-20 cursor-pointer"
      >
        <img src={props.image} />
        <hr />
        <h1 className="uppercase font-bold text-2xl">{props.name}</h1>
        <h1 className="font-semibold">₹{props.price}</h1>
        <p className="flex-grow break-words">{props.description}</p>
        <div className="mt-5   flex justify-between">
          <button
            onClick={()=>addToCart(props.id)}
            className="bg-black text-white p-2 rounded-md cursor-pointer"
          >
            Add To Cart
          </button>
          <button
            className="bg-blue-900 text-white p-2 rounded-md cursor-pointer"
            onClick={() => navigate(`/product/${props.id}`)}
          >
            View Details
          </button>
        </div>
      </div>
    );
  }

  return (
    <main>
        
      <div className="flex justify-between">
      <p></p>
      <h1 className="text-3xl text-center  font-bold p-3 m-2 uppercase">
          Products
        </h1>
        

        <div>
          <button
            className="cursor-pointer p-2 m-2 rounded-md text-white bg-green-800 font-semibold"
            onClick={() => {
              navigate("/cart");
            }}
          >
            Cart
          </button>
          <button
            className="cursor-pointer p-2 m-2 rounded-md text-white bg-red-700 font-semibold"
            onClick={Logout}
          >
            Log Out
          </button>
        </div>
      </div>

      {products.length > 0 ? (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-8">
          {products.map((product) => (
            <Card
              key={product._id}
              id={product._id}
              image={product.ImageURL}
              name={product.name}
              price={product.price}
              description={product.description}
            />
          ))}
        </div>
      ) : (
        <div>Sorry No Products Available!!</div>
      )}
    </main>
  );
}
