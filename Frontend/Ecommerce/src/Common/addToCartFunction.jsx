import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export function addToCartFunction() {
    const navigate = useNavigate();

    const addToCart = async (product) => {
        const token = localStorage.getItem('token');
        if (token) {
            const user_id = await jwtDecode(token).userId;
            try {
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/cart`, {
                    product_id: product,
                    user_id,
                    quantity: 1
                });
                if (response) {
                    navigate('/cart');
                }else{
                    alert('Error while adding Product');
                }
            } catch (e) {
                console.log(e);
                alert('Error while adding Product');
            }
        } else {
            alert('You need to login first');
            navigate('/');
        }
    };

    return addToCart;
}
