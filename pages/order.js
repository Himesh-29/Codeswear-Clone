import React from "react";
import Link from "next/link";

import mongoose from "mongoose";

import Order from "../models/Order";

const order = ({ order }) => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className=" w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                Codeswear
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                Order Id: {`${order.orderid}`}
              </h1>
              <p className="leading-relaxed mb-4">
                Your order has been successfully placed
              </p>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-10">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Product name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from(Object.keys(order.products)).map((product) => {
                      return (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                          >
                            {order.products[product].name}
                          </th>
                          <td className="px-6 py-4">
                            {order.products[product].qty}
                          </td>
                          <td className="px-6 py-4">
                            ₹{order.products[product].price}
                          </td>
                          <td className="px-6 py-4">
                            ₹
                            {order.products[product].price *
                              order.products[product].qty}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="flex mt-4">
                <span className=" title-font font-medium text-2xl text-gray-900">
                  Subtotal: ₹{`${order.amount}`}
                </span>
                <Link href="/orders">
                  <button className="flex ml-auto text-white bg-blue-500 border-0 py-2 px-3 focus:outline-none hover:bg-blue-600 rounded items-center shadow-md">
                    Back to all orders
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGOURL);
  }
  let order = await Order.findById(context.query.id);

  return { props: { order: JSON.parse(JSON.stringify(order)) } };
}

export default order;
