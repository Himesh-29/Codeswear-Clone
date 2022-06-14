import React, { useState, useEffect } from "react";
import {
  AiFillMinusCircle,
  AiFillPlusCircle,
  AiOutlineClear,
} from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/router";

import { ToastContainer, toast } from "react-toastify";

var jwt = require("jsonwebtoken");

const Checkout = ({
  cart,
  clearCart,
  removeFromCart,
  addToCart,
  subTotal,
  user,
}) => {
  const router = useRouter();

  const [name, setname] = useState("");
  const user_email = user.value
    ? jwt.verify(user.value, `${process.env.NEXT_PUBLIC_JSONWEBTOKEN}`).email
    : "";
  const [EMAIL, setemail] = useState("");
  const [address, setaddress] = useState("");
  const [phone, setphone] = useState("");
  const [pincode, setpincode] = useState("");
  const [state, setstate] = useState("");
  const [district, setdistrict] = useState("");

  const handlerChange = (e) => {
    if (e.target.name == "name") setname(e.target.value);
    else if (e.target.name == "email") setemail(e.target.value);
    else if (e.target.name == "address") setaddress(e.target.value);
    else if (e.target.name == "phone") setphone(e.target.value);
    else if (e.target.name == "pincode") setpincode(e.target.value);
    else if (e.target.name == "state") setstate(e.target.value);
    else if (e.target.name == "district") setdistrict(e.target.value);
  };

  let initiatePayment = async (e) => {
    e.preventDefault();
    setphone(Number.parseInt(phone).toString());
    if (
      name.length == 0 ||
      (EMAIL.length == 0 && user_email.length == 0) ||
      address.length == 0 ||
      phone.length != 10 ||
      Number.parseInt(phone) <= 0 ||
      pincode.length != 6 ||
      state.length == 0 ||
      district.length == 0
    ) {
      let stringError = "";
      if (name.length == 0) stringError += "Name, ";
      if (EMAIL.length == 0 && user_email.length == 0) stringError += "Email, ";
      if (address.length == 0) stringError += "Address, ";
      if (phone.length != 10 || Number.parseInt(phone) <= 0)
        stringError += "Phone, ";
      if (pincode.length != 6) stringError += "Pincode, ";
      if (state.length == 0) stringError += "State, ";
      if (district.length == 0) stringError += "District";

      toast.error(`Please provide valid details for ${stringError}`, {
        position: "top-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.info("Verifying your details", {
        position: "top-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      let res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/verifyCheckoutDetails`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cart: cart,
            subTotal: subTotal,
            pincode: Number.parseInt(pincode),
          }),
        }
      );
      let response = await res.json();
      if (res.status == 404) {
        toast.error(response.error, {
          position: "top-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        clearCart();
      } else if (res.status == 400) {
        toast.error(response.error, {
          position: "top-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        let email = user.value ? user_email : EMAIL;
        let newaddress = `${address},${district},${state}-${pincode}`;

        let data = {
          orderid: Math.floor(Math.random() * Date.now()),
          cart,
          subTotal,
          email,
          address: newaddress,
          pincode,
          phone,
          name,
        };
        res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addOrder`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        response = await res.json();
        if (res.status == 200) {
          toast.success("Order confirmed. Redirecting to your order details!", {
            position: "top-left",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          clearCart();
          setTimeout(() => {
            router.push(`/order?id=${response._id}`);
          }, 4500);
        } else {
          toast.error(response.error, {
            position: "top-left",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            router.push("/");
          }, 2500);
        }
      }
    }
  };

  return (
    <div className="container m-auto">
      <ToastContainer
        position="top-left"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h1 className="font-bold text-3xl my-8 text-center">Checkout</h1>
      <h2 className="lg:mx-32 mx-4 font-bold text-xl">1. Delivery details</h2>
      <form>
        <div className="mb-8 mt-4 lg:mx-32 mx-4">
          <div className="flex justify-between my-2">
            <div style={{ width: "48%" }}>
              <label
                htmlFor="name"
                className="leading-7 text-sm text-gray-600 font-semibold"
              >
                Name<span className="text-red-800">*</span>
              </label>
              <input
                required={true}
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handlerChange}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div style={{ width: "48%" }}>
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600 font-semibold"
              >
                Email<span className="text-red-800">*</span>
              </label>
              {user.value ? (
                <input
                  required={true}
                  readOnly={true}
                  type="email"
                  id="email"
                  name="email"
                  value={user_email}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              ) : (
                <input
                  required={true}
                  type="email"
                  id="email"
                  name="email"
                  value={EMAIL}
                  onChange={handlerChange}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              )}
            </div>
          </div>
          <div style={{ width: "100%" }} className="my-2">
            <label
              htmlFor="address"
              className="leading-7 text-sm text-gray-600 font-semibold"
            >
              Address<span className="text-red-800">*</span>
            </label>
            <textarea
              type="address"
              id="address"
              name="address"
              value={address}
              onChange={handlerChange}
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
                Phone<span className="text-red-800">*</span>
              </label>
            </div>
            <div style={{ width: "48%" }}>
              <label
                htmlFor="pincode"
                className="leading-7 text-sm text-gray-600 font-semibold"
              >
                Pincode<span className="text-red-800">*</span>{" "}
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
                value={phone}
                onChange={handlerChange}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div style={{ width: "48%" }}>
              <input
                required={true}
                type="number"
                id="pincode"
                name="pincode"
                value={pincode}
                onChange={handlerChange}
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
                State<span className="text-red-800">*</span>
              </label>
              <input
                required={true}
                type="text"
                id="state"
                name="state"
                value={state}
                onChange={handlerChange}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div style={{ width: "48%" }}>
              <label
                htmlFor="district"
                className="leading-7 text-sm text-gray-600 font-semibold"
              >
                District<span className="text-red-800">*</span>
              </label>
              <input
                required={true}
                type="text"
                id="district"
                name="district"
                value={district}
                onChange={handlerChange}
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
                No items in the cart. Please add few items in the cart to
                checkout
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
            <Link href="/checkout">
              <button
                className="flex mt-8 mr-2 text-white bg-blue-600 border-0 p-2 focus:outline-none hover:bg-blue-700 rounded text-sm font-semibold disabled:bg-blue-300"
                disabled={Object.keys(cart).length == 0}
                onClick={initiatePayment}
              >
                <BsFillBagCheckFill className="m-1" size={13} />
                Place Order
              </button>
            </Link>

            <button
              className="flex mx-auto mt-8 text-white bg-blue-600 border-0 p-2 focus:outline-none hover:bg-blue-700 rounded text-sm font-semibold disabled:bg-blue-300"
              disabled={Object.keys(cart).length == 0}
              onClick={clearCart}
            >
              <AiOutlineClear className="m-1" size={13} />
              Clear cart
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
