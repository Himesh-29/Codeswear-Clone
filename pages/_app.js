import { useState, useEffect } from "react";

import Head from "next/head";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Topdiv from "../components/Topdiv";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setsubTotal] = useState(0);

  useEffect(() => {
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      console.error(error);
      localStorage.clear();
    }
  }, []);

  const saveCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
    let subt = 0;
    let keys = Object.keys(cart);
    for (let i = 0; i < keys.length; i++) {
      subt += cart[keys[i]].qty * cart[keys[i]].price;
    }
    setsubTotal(subt);
  };

  const addToCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart;
    if (!Object.keys(cart).includes(itemCode)) {
      newCart[itemCode] = { qty: 1, name, price, size, variant };
    } else {
      newCart[itemCode].qty = newCart[itemCode].qty + qty;
    }
    setCart(newCart);
    saveCart(newCart);
  };

  const clearCart = () => {
    setCart({});
    saveCart({});
  };

  const removeFromCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart;
    if (Object.keys(cart).includes(itemCode)) {
      newCart[itemCode].qty = newCart[itemCode].qty - qty;
    }
    if (newCart[itemCode].qty <= 0) delete newCart[itemCode];
    setCart(newCart);
    saveCart(newCart);
  };

  return (
    <>
      <Head>
        <title>Codeswear: Wear the code that you type</title>
        <meta
          name="description"
          content="Codeswear.com is a site designated for the coders to purchase various clothing items like tshirts, hoddies, cups and mugs, stickers and many more. Codeswear is the perfect place to shop online for the code that you write to wear. We accept payments and will be able to deliver to your doorstep various items."
        />
        <link rel="icon" href="/codeswear-logo.ico" />
      </Head>
      <Navbar
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
      />
      <Topdiv />
      <Component
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
        {...pageProps}
      />
      <Footer />
    </>
  );
}

export default MyApp;
