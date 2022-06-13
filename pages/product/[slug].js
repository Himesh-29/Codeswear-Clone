import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";

const Slug = ({
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  buyNow,
  subTotal,
  product,
}) => {
  // console.log(product.slug);
  const [pin, setpin] = useState();
  const [serviceability, setServiceability] = useState();

  const checkService = async (pin) => {
    let data = await fetch(`${process.env.HOST}/api/pincode`);
    let pinJson = await data.json();
    if (pinJson.includes(pin)) {
      setServiceability(true);
      toast.success("Yay! Your pincode is serviceable.", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("Sorry! We don't deliver to this pincode yet.", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setServiceability(false);
    }
  };

  const onChangePin = (e) => {
    setpin(e.target.value);
  };

  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <ToastContainer
          position="top-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="container px-5 py-16 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto px-24 rounded"
              src={product.image}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6  lg:mt-0">
              <h1 className="text-gray-900 text-3xl title-font mb-6 font-medium ">
                {product.title}
              </h1>
              {product.size && (
                <h2 className=" text-sm title-font text-gray-500 tracking-widest">
                  Size: {product.size}
                </h2>
              )}
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                Colour: {product.color}
              </h2>
              <p className="mt-8 leading-relaxed mb-6">{product.description}</p>

              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  ₹{product.price}
                </span>
                <button
                  onClick={() => {
                    buyNow(
                      product.slug,
                      product.price,
                      product.title,
                      "size" in product ? product.size.split(",")[0] : "",
                      "color" in product ? product.color : ""
                    );
                  }}
                  className="flex ml-14 text-white bg-blue-500 border-0 p-2 focus:outline-none hover:bg-blue-600 rounded"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => {
                    addToCart(
                      product.slug,
                      1,
                      product.price,
                      product.title,
                      "size" in product ? product.size.split(",")[0] : "",
                      "color" in product ? product.color : ""
                    );
                  }}
                  className="flex ml-5 text-white bg-blue-500 border-0 p-2 focus:outline-none hover:bg-blue-600 rounded"
                >
                  Add to cart
                </button>
              </div>
              <div className="pincode mt-6 flex flex-row">
                <input
                  type="number"
                  className="px-2 mr-5 border-2 rounded"
                  placeholder="Enter your pincode"
                  onChange={onChangePin}
                />
                <button
                  onClick={() => {
                    checkService(Number.parseInt(pin));
                  }}
                  className="text-white bg-blue-500 border-0 p-2 focus:outline-none hover:bg-blue-600 rounded"
                >
                  Check
                </button>
              </div>
              {serviceability != true && serviceability != false ? (
                <div></div>
              ) : serviceability != true ? (
                <div className=" text-red-500 text-sm mt-3">
                  Sorry! We don't deliver to this pincode yet.
                </div>
              ) : (
                <div className="text-green-500 text-sm mt-3">
                  Yay! Your pincode is serviceable.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { slug } = context.query;
  const res = await fetch(`${process.env.HOST}/api/getProductBySlug`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ slug: slug }),
  });
  const data = await res.json();
  const product = data.product;

  return { props: { product } };
}

export default Slug;
