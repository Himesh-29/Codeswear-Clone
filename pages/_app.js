import { useState, useEffect } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Topdiv from "../components/Topdiv";

import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import LoadingBar from "react-top-loading-bar";

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setsubTotal] = useState(0);
  const [user, setuser] = useState({ value: null });
  const [key, setkey] = useState(0);
  const [progress, setprogress] = useState(0);

  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setprogress(50);
    });
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
      let token = localStorage.getItem("token");
      if (token) {
        setuser({ value: token });
        setkey(Math.random());
      }
      router.events.on("routeChangeComplete", () => {
        setprogress(100);
      });
    } catch (error) {
      console.error(error);
      localStorage.clear();
    }
  }, [router.query]);

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

  const buyNow = (itemCode, price, name, size, variant) => {
    let newCart = {};
    newCart[itemCode] = { qty: 1, name, price, size, variant };
    setCart(newCart);
    saveCart(newCart);
    router.push("/checkout");
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

  const logout = () => {
    localStorage.removeItem("token");
    setuser({ value: null });
    setkey(Math.random());
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
      <LoadingBar
        color="#025db3"
        progress={progress}
        waitingTime={800}
        onLoaderFinished={() => setprogress(0)}
      />
      <nav className="bg-zinc-50 border-gray-200 rounded dark:bg-gray-800 fixed top-0 min-w-full border-2 z-50">
        <Navbar
          user={user}
          key={key}
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          subTotal={subTotal}
          logout={logout}
        />
      </nav>
      <Topdiv />
      <Component
        user={user}
        key={key}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
        buyNow={buyNow}
        logout={logout}
        {...pageProps}
      />
      <Footer />
    </>
  );
}

export default MyApp;
