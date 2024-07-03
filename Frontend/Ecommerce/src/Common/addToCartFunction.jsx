import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export function addToCartFunction() {
    const navigate = useNavigate();

    const addToCart = async (product) => {
        const token = localStorage.getItem('token');
        if (token) {
            const user_id = jwtDecode(token).userId;
            try {
                const response = await axios.post('http://localhost:3000/cart', {
                    product_id: product,
                    user_id,
                    quantity: 1
                });
                if (response) {
                    navigate('/cart');
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
