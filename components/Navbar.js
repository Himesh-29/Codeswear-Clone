import React, { useRef } from "react";
import {
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiFillMinusCircle,
  AiFillPlusCircle,
  AiOutlineClear,
} from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = ({ cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  // console.log(cart, addToCart, removeFromCart, clearCart, subTotal);
  const ref = useRef();
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };

  let path = useRouter().pathname;
  return (
    <nav className="bg-zinc-50 border-gray-200 rounded dark:bg-gray-800 fixed top-0 min-w-full border-2 z-50  shadow-md">
      <div
        style={{ width: "87%" }}
        className="flex flex-row justify-between opacity-90"
      >
        <Link href="/">
          <img
            src="/Codeswear-brand.png"
            width="150rem"
            className="codeswear-brand-logo cursor-pointer"
            alt="Codeswear Logo"
          />
        </Link>
        <div className="flex flex-wrap justify-between items-center">
          <button
            data-collapse-toggle="mobile-menu"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu"
            onClick={() => {
              document
                .querySelector(".codeswear-brand-logo")
                .classList.toggle("hidden");
              document.getElementById("mobile-menu").classList.toggle("hidden");

              document.getElementById("burgerOpen").classList.toggle("hidden");
              document.getElementById("burgerCls").classList.toggle("hidden");
            }}
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              id="burgerOpen"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              className="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              id="burgerCls"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <Link href="/" aria-current="page">
                <li
                  className={
                    path === "/"
                      ? "text-lg slublock pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                      : "text-lg block pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 hover:cursor-pointer"
                  }
                  onClick={() => {
                    if (window.innerWidth < 768)
                      document
                        .querySelector(".codeswear-brand-logo")
                        .classList.toggle("hidden");
                    document
                      .getElementById("mobile-menu")
                      .classList.toggle("hidden");
                    document
                      .getElementById("burgerOpen")
                      .classList.toggle("hidden");
                    document
                      .getElementById("burgerCls")
                      .classList.toggle("hidden");
                  }}
                >
                  Home
                </li>
              </Link>
              <Link href="/tshirts">
                <li
                  className={
                    path === "/tshirts"
                      ? "text-lg slublock py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                      : "text-lg block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 hover:cursor-pointer"
                  }
                  onClick={() => {
                    if (window.innerWidth < 768)
                      document
                        .querySelector(".codeswear-brand-logo")
                        .classList.toggle("hidden");
                    document
                      .getElementById("mobile-menu")
                      .classList.toggle("hidden");
                    document
                      .getElementById("burgerOpen")
                      .classList.toggle("hidden");
                    document
                      .getElementById("burgerCls")
                      .classList.toggle("hidden");
                  }}
                >
                  T-shirts
                </li>
              </Link>
              <Link href="/hoodies">
                <li
                  className={
                    path === "/hoodies"
                      ? "text-lg slublock py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                      : "text-lg block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 hover:cursor-pointer"
                  }
                  onClick={() => {
                    if (window.innerWidth < 768)
                      document
                        .querySelector(".codeswear-brand-logo")
                        .classList.toggle("hidden");
                    document
                      .getElementById("mobile-menu")
                      .classList.toggle("hidden");
                    document
                      .getElementById("burgerOpen")
                      .classList.toggle("hidden");
                    document
                      .getElementById("burgerCls")
                      .classList.toggle("hidden");
                  }}
                >
                  Hoodies
                </li>
              </Link>
              <li
                className={
                  path === "/mugs"
                    ? "text-lg slublock py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                    : "text-lg block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 hover:cursor-pointer"
                }
                onClick={() => {
                  if (window.innerWidth < 768)
                    document
                      .querySelector(".codeswear-brand-logo")
                      .classList.toggle("hidden");
                  document
                    .getElementById("mobile-menu")
                    .classList.toggle("hidden");
                  document
                    .getElementById("burgerOpen")
                    .classList.toggle("hidden");
                  document
                    .getElementById("burgerCls")
                    .classList.toggle("hidden");
                }}
              >
                <Link href="/mugs">Mugs</Link>
              </li>
              <Link href="/contact">
                <li
                  className={
                    path === "/contact"
                      ? "text-lg slublock py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                      : "text-lg block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 hover:cursor-pointer"
                  }
                  onClick={() => {
                    if (window.innerWidth < 768)
                      document
                        .querySelector(".codeswear-brand-logo")
                        .classList.toggle("hidden");
                    document
                      .getElementById("mobile-menu")
                      .classList.toggle("hidden");
                    document
                      .getElementById("burgerOpen")
                      .classList.toggle("hidden");
                    document
                      .getElementById("burgerCls")
                      .classList.toggle("hidden");
                  }}
                >
                  Contact
                </li>
              </Link>
              <Link href="/login">
                <li
                  className={
                    path === "/login"
                      ? "mr-10 text-lg slublock py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                      : "mr-10 text-lg block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 hover:cursor-pointer"
                  }
                  onClick={() => {
                    if (window.innerWidth < 768)
                      document
                        .querySelector(".codeswear-brand-logo")
                        .classList.toggle("hidden");
                    document
                      .getElementById("mobile-menu")
                      .classList.toggle("hidden");
                    document
                      .getElementById("burgerOpen")
                      .classList.toggle("hidden");
                    document
                      .getElementById("burgerCls")
                      .classList.toggle("hidden");
                  }}
                >
                  Login
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
      <div className="absolute top-3 right-0 text-lg slublock py-2 pr-4 pl-3 bg-transparent text-blue-700">
        <AiOutlineShoppingCart
          className="lg:text-3xl sm:text-xl md:text-2xl cursor-pointer"
          onClick={toggleCart}
        />
      </div>
      <div
        ref={ref}
        className="sidebar h-[100vh] absolute top-0 -right-1 bg-cyan-200 py-10 pr-16 pl-5 transform transition-transform translate-x-full w-80 rounded-xl"
      >
        <h2 className="font-bold text-lg mb-5 ">Shopping Cart</h2>
        <span className="absolute top-4 right-2" onClick={toggleCart}>
          <AiFillCloseCircle className="text-2xl cursor-pointer" />
        </span>

        <ol className="pl-4 list-decimal text-lg text-violet-900 font-semibold">
          {Object.keys(cart).length == 0 && (
            <div>
              No items in the cart. Please add few items in the cart to checkout
            </div>
          )}
          {Object.keys(cart).map((item) => (
            <li className="my-3" key={item}>
              <div className="item flex w-full justify-between">
                <span style={{ overflowWrap: "anywhere" }} className="w-3/5">
                  {cart[item].name}
                </span>
                <span
                  style={{ overflowWrap: "anywhere" }}
                  className="flex items-center justify-center w-2/5"
                >
                  <AiFillMinusCircle
                    onClick={() => {
                      removeFromCart(
                        item,
                        1,
                        cart[item].price,
                        cart[item].name,
                        cart[item].size,
                        cart[item].variant
                      );
                    }}
                    className="mr-1 cursor-pointer"
                  />
                  {cart[item].qty}
                  <AiFillPlusCircle
                    className="ml-1 cursor-pointer"
                    onClick={() => {
                      addToCart(
                        item,
                        1,
                        cart[item].price,
                        cart[item].name,
                        cart[item].size,
                        cart[item].variant
                      );
                    }}
                  />
                </span>
              </div>
            </li>
          ))}
        </ol>
        <div className="flex flex-row justify-between">
          <button className="flex mx-auto mt-8 text-white bg-blue-600 border-0 p-2 focus:outline-none hover:bg-blue-700 rounded text-sm font-semibold">
            <BsFillBagCheckFill className="m-1" size={13} />
            Checkout
          </button>
          <button
            className="flex mx-auto mt-8 text-white bg-blue-600 border-0 p-2 focus:outline-none hover:bg-blue-700 rounded text-sm font-semibold"
            onClick={clearCart}
          >
            <AiOutlineClear className="m-1" size={13} />
            Clear cart
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
