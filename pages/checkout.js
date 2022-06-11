import React from "react";
import {
  AiFillMinusCircle,
  AiFillPlusCircle,
  AiOutlineClear,
} from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import Link from "next/link";

const Checkout = ({ cart, clearCart, removeFromCart, addToCart, subTotal }) => {
  let initiatePayment = () => {
    let data = {
      orderid: Math.floor(Math.random() * Date.now()),
      cart,
      subTotal,
    };
  };

  return (
    <div className="container m-auto">
      <h1 className="font-bold text-3xl my-8 text-center">Checkout</h1>
      <h2 className="lg:mx-32 mx-4 font-bold text-xl">1. Delivery details</h2>
      <div className="mb-8 mt-4 lg:mx-32 mx-4">
        <div className="flex justify-between my-2">
          <div style={{ width: "48%" }}>
            <label
              htmlFor="name"
              className="leading-7 text-sm text-gray-600 font-semibold"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div style={{ width: "48%" }}>
            <label
              htmlFor="email"
              className="leading-7 text-sm text-gray-600 font-semibold"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div style={{ width: "100%" }} className="my-2">
          <label
            htmlFor="address"
            className="leading-7 text-sm text-gray-600 font-semibold"
          >
            Address
          </label>
          <textarea
            type="address"
            id="address"
            name="address"
            rows="6"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="flex justify-between my-2">
          <div style={{ width: "48%" }}>
            <label
              htmlFor="phone"
              className="leading-7 text-sm text-gray-600 font-semibold"
            >
              Phone
            </label>
          </div>
          <div style={{ width: "48%" }}>
            <label
              htmlFor="pincode"
              className="leading-7 text-sm text-gray-600 font-semibold"
            >
              Pincode{" "}
              <span className="text-xs">
                (Shipping only available in India)
              </span>
            </label>
          </div>
        </div>
        <div className="flex justify-between my-2">
          <div style={{ width: "48%" }}>
            <input
              placeholder="Your 10-Digit Phone Number"
              type="number"
              id="phone"
              name="phone"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div style={{ width: "48%" }}>
            <input
              type="number"
              id="pincode"
              name="pincode"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="flex justify-between my-2">
          <div style={{ width: "48%" }}>
            <label
              htmlFor="state"
              className="leading-7 text-sm text-gray-600 font-semibold"
            >
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div style={{ width: "48%" }}>
            <label
              htmlFor="district"
              className="leading-7 text-sm text-gray-600 font-semibold"
            >
              District
            </label>
            <input
              type="text"
              id="district"
              name="district"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <h2 className="lg:mx-32 mx-4 font-bold text-xl">2. View cart items</h2>
      <div className="lg:mx-32 mx-4 my-4">
        <ol className=" list-decimal text-lg text-violet-900 font-semibold">
          {Object.keys(cart).length == 0 && (
            <div>
              No items in the cart. Please add few items in the cart to checkout
            </div>
          )}
          {Object.keys(cart).map((item) => (
            <li className="my-3 mx-4" key={item}>
              <div className="item flex w-full justify-between">
                <span style={{ overflowWrap: "anywhere" }} className="w-3/5">
                  {cart[item].name} -{" "}
                  {cart[item].size ? `(${cart[item].size})` : ""}{" "}
                  {cart[item].variant ? `(${cart[item].variant})` : ""}
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
        <div className="my-3 flex flex-row" style={{ width: "fit-content" }}>
          Subtotal: ₹ {subTotal}
        </div>
        <div className="flex flex-row" style={{ width: "fit-content" }}>
          {Object.keys(cart).length == 0 ? (
            <button
              className="flex mt-8 mr-2 text-white bg-blue-600 border-0 p-2 focus:outline-none hover:bg-blue-700 rounded text-sm font-semibold opacity-50"
              disabled
            >
              <BsFillBagCheckFill className="m-1" size={13} />
              Place Order
            </button>
          ) : (
            <Link href="/checkout">
              <button
                onClick={initiatePayment}
                className="flex mt-8 mr-2 text-white bg-blue-600 border-0 p-2 focus:outline-none hover:bg-blue-700 rounded text-sm font-semibold"
              >
                <BsFillBagCheckFill className="m-1" size={13} />
                Place Order
              </button>
            </Link>
          )}
          {Object.keys(cart).length == 0 ? (
            <button
              className="flex mx-auto mt-8 text-white bg-blue-600 border-0 p-2 focus:outline-none hover:bg-blue-700 rounded text-sm font-semibold opacity-50"
              disabled
            >
              <AiOutlineClear className="m-1" size={13} />
              Clear cart
            </button>
          ) : (
            <button
              className="flex mx-auto mt-8 text-white bg-blue-600 border-0 p-2 focus:outline-none hover:bg-blue-700 rounded text-sm font-semibold"
              onClick={clearCart}
            >
              <AiOutlineClear className="m-1" size={13} />
              Clear cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
