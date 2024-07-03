import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export function DeleteFromCart() {
    const navigate = useNavigate();

    const deleteitem = async (productId) => {
        const token = localStorage.getItem('token');
        if (token) {
            const userId = await jwtDecode(token).userId;
            console.log("userId"+userId);
            console.log("Product id"+productId);
            try {
                const response = await axios.delete('https://ecommerce-1tx1.onrender.com/cart/', {
                   data:{
                    productId,
                    userId
                   } 
                });
                if (!response) {
                    console.log(response);
                    alert('Error while deleting Product');
                }
            } catch (e) {
                console.log('inside catch');
                console.log(e);
                alert('Error while deleting Product');
            }
        } else {
            alert('You need to login first');
            navigate('/');
        }
    };

    return deleteitem;
}
