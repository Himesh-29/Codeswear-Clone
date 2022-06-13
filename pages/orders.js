import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { ToastContainer, toast } from "react-toastify";

const orders = () => {
  let router = useRouter();
  const [hasLoaded, sethasLoaded] = useState(false);
  const [myorders, setmyorders] = useState();
  useEffect(() => {
    const fetchData = async () => {
      let res = await fetch("http://localhost:3000/api/myorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: localStorage.getItem("token") }),
      });
      let response = await res.json();
      if (res.status === 200) {
        setmyorders(response.orders);
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
      }
    };
    if (localStorage.getItem("token") === null) {
      router.push("/");
    } else {
      fetchData();
      sethasLoaded(true);
    }
  }, [router.query]);
  return (
    <div>
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
      <div className="container  mx-auto w-4/5">
        <h1 className="font-semibold text-3xl text-center my-10">My Orders</h1>

        {myorders && hasLoaded ? (
          myorders.length !== 0 ? (
            Array.from(myorders).map((order) => {
              return (
                <Link href={`/order?id=${order._id}`}>
                  <a>
                    <div
                      key={order._id}
                      className="relative overflow-x-auto shadow-md sm:rounded-lg my-10"
                    >
                      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th scope="col" className="px-6 py-3">
                              Product name
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Color
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Quantity
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Price
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.from(Object.keys(order.products)).map(
                            (product) => {
                              return (
                                <tr
                                  key={order.products[product].name}
                                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                  <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                                  >
                                    {order.products[product].name}
                                  </th>
                                  <td className="px-6 py-4">
                                    {order.products[product].variant}
                                  </td>
                                  <td className="px-6 py-4">
                                    {order.products[product].qty}
                                  </td>
                                  <td className="px-6 py-4">
                                    ₹{order.products[product].price}
                                  </td>
                                </tr>
                              );
                            }
                          )}
                        </tbody>
                      </table>
                    </div>
                  </a>
                </Link>
              );
            })
          ) : (
            <div className="relative overflow-x-auto sm:rounded-lg my-10 text-center text-xl">
              You have not yet placed any order with CodesWear!
            </div>
          )
        ) : (
          <div className="mb-5" style={{ textAlign: "-webkit-center" }}>
            <svg
              role="status"
              class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              ></path>
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              ></path>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default orders;
