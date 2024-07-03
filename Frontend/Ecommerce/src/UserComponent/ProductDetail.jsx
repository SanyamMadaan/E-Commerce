import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { addToCartFunction } from "../Common/addToCartFunction";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const addToCart = addToCartFunction();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/products/${id}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading product details</div>;

  return (
    <main className="bg-slate-100 h-screen">
      <div className="text-slate-100">j</div>
      <div className="bg-white lg:mx-20 lg:w-1/2 m-5 border-2 border-black rounded-md">
        <div className="text-4xl font-bold text-center mb-2">
          {product.name}
        </div>
        <div className="flex justify-center h-80">
          <img src={product.ImageURL} alt={product.name} />
        </div>
        <h2 className="text-center m-2 font-semibold text-2xl">
          ₹{product.price}
        </h2>
        <p className="m-2 text-xl font-semi-bold">{product.description}</p>
        <button
          onClick={() => addToCart(product._id)}
          className="m-2 text-center border-2 bg-green-800 font-bold text-white rounded-md cursor-pointer p-2"
        >
          Add To Cart
        </button>
      </div>
    </main>
  );
}
