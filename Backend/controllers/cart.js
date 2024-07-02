const express = require("express");
const router = express.Router();
const { Cart, Product } = require("../db");  

//  Retrieve  user's shopping cart
router.get("/", async (req, res) => {
    const { userId } = req.body; // Assuming userId is passed in the request body

    try {
        const cart = await Cart.findOne({ user: userId }).populate('products.product');
        if (!cart) {
            return res.status(404).json({ msg: "Cart not found" });
        }
        res.status(200).json(cart);
    } catch (e) {
        console.log(e);
        return res.status(400).json({ msg: "Error while retrieving cart" });
    }
});

//  Add an item to the cart
router.post("/", async (req, res) => {
    const { product, quantity, userId } = req.body;
    try {
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            const productDetails = await Product.findById(product);
            cart = await Cart.create({
                user: userId,
                products: [{ product, quantity }],
                total: productDetails.price * quantity
            });
        } else {
            const productIndex = cart.products.findIndex(p => p.product.toString() === product);

            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({ product, quantity });
            }

            const productDetails = await Product.findById(product);
            cart.total += productDetails.price * quantity;

            await cart.save();//saving updated cart
        }

        res.status(200).json(cart);
    } catch (e) {
        console.log(e);
        res.status(400).json({ msg: "Unable to add item to cart" });
    }
});


//  Remove an item from the cart
router.delete("/:id", async (req, res) => {
    const productId = req.params.id;
    const { userId } = req.body;

    try {
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ msg: "Cart not found" });
        }

        const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

        if (productIndex === -1) {
            return res.status(404).json({ msg: "Product not found in cart" });
        }

        const productDetails = await Product.findById(productId);
        const productQuantity = cart.products[productIndex].quantity;

        cart.total -= productDetails.price * productQuantity;
        cart.products.splice(productIndex, 1);

        await cart.save();

        res.status(200).json(cart);
    } catch (e) {
        console.log(e);
        res.status(400).json({ msg: "Unable to remove item from cart" });
    }
});

module.exports = router;
