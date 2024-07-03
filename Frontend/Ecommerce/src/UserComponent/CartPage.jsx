import { useState, useEffect } from "react";
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import { addToCartFunction } from "../Common/addToCartFunction";

export function CartPage() {
    const [addedItems, setAddedItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const addToCart = addToCartFunction();

    const fetchCartItems = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.userId;
                const res = await axios.get('http://localhost:3000/cart', {
                    headers: {
                        userid: userId
                    }
                });
                console.log("user id is " + userId);
                console.log(res.data);
                // Calculate the total amount based on current product prices
                const currentTotal = res.data.products.reduce((total, item) => {
                    return total + (item.product.price * item.quantity);
                }, 0);
                setTotalAmount(currentTotal); // Use calculated total
                setAddedItems(res.data.products);
            }
        } catch (e) {
            console.log("Error while fetching cart items " + e);
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    const handleAddToCart = async (productId) => {
        await addToCart(productId);
        await fetchCartItems(); // Re-fetch the cart items to reflect changes
    };

    return (
        <div>
            {addedItems.length > 0 ? (
                <>
                    <h1 className="text-3xl font-semibold uppercase text-center m-2 p-2">Checkout Page</h1>
                    <div className="flex justify-between">
                        <div className="w-5/6">
                            {addedItems.map(item => (
                                <div className="lg:w-2/3  m-2 ml-4 border-2 border-black p-5 rounded-lg" key={item.product._id}>
                                    <img src={item.product.ImageURL} alt={item.product.name} />
                                    <h1 className="text-2xl uppercase mt-2 font-bold">{item.product.name}</h1>
                                    <h1 className="text-2xl font-semibold">₹{item.product.price}</h1>
                                    <h1 className="text-x break-words mb-2">{item.product.description}</h1>
                                    <div className="flex justify-center mt-4">
                                        <div className="bg-black border-2 border-white rounded-lg w-fit px-3">
                                            <button onClick={() => handleAddToCart(item.product._id)} className="text-white cursor-pointer ml-2 mr-2 text-xl">+</button>
                                            <button className="text-white">{item.quantity}</button>
                                            <button className="text-white cursor-pointer ml-2 mr-2 text-xl">-</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="ml-10 mr-10 mt-40 text-green-700 text-3xl font-semibold">
                            Total amount payable is <span className="font-bold text-green-900">₹{totalAmount}</span>
                        </div>
                    </div>
                </>
            ) : (
                <h1>Cart is Empty</h1>
            )}
        </div>
    );
}
