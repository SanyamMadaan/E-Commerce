const express = require("express");
const router = express.Router();
const { Cart, Product } = require("../db");

// get user's shopping cart
router.get("/", async (req, res) => {
  try {
    const userId = req.headers.userid;
    console.log(userId);
    const cart = await Cart.findOne({ user: userId }).populate("products.product");
    if (!cart) {
      console.log("no cart found");
      return res.status(200).json({ msg: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (e) {
    console.log("inside catch");
    console.log(e);
    return res.status(400).json({ msg: "Error while retrieving cart" });
  }
});

// Add an item to the cart
router.post("/", async (req, res) => {
  const { product_id, user_id, quantity } = req.body;
  if (!product_id || !user_id || !quantity) {
    return res.status(400).json({ msg: "Required all inputs" });
  }
  try {
    let cart = await Cart.findOne({ user: user_id });

    if (!cart) {
      const productDetails = await Product.findById(product_id);
      cart = await Cart.create({
        user: user_id,
        products: [{ product: product_id, quantity }],
        total: productDetails.price * quantity,
      });
    } else {
      const productIndex = cart.products.findIndex(
        (p) => p.product.toString() === product_id
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ product: product_id, quantity });
      }

      const productDetails = await Product.findById(product_id);
      cart.total += productDetails.price * quantity;

      await cart.save(); //save the updated cart
    }

    res.status(200).json(cart);
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: "Unable to add item to cart" });
  }
});

// Remove an item from the cart
router.delete("/", async (req, res) => {
  const { productId, userId } = req.body;
  if (!productId || !userId) {
    return res.status(400).json({ msg: 'Required all fields' });
  }

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

    if (productQuantity > 1) {
      cart.products[productIndex].quantity -= 1;
      cart.total -= productDetails.price;
    } else {
      cart.products.splice(productIndex, 1);
      cart.total -= productDetails.price;
    }

    if (cart.total < 0) {
      cart.total = 0;
    }

    await cart.save();

    res.status(200).json(cart);
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: "Unable to remove item from cart" });
  }
});

module.exports = router;
