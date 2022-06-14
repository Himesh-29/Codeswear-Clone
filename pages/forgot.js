import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { ToastContainer, toast } from "react-toastify";

const Forgot = () => {
  let router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      router.push("/");
    }
  }, []);

  const [email, setemail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleChange = (e) => {
    if (e.target.name == "email") setemail(e.target.value);
    else if (e.target.name == "newPassword") setNewPassword(e.target.value);
    else if (e.target.name == "confirmNewPassword")
      setConfirmNewPassword(e.target.value);
  };

  const sendResetEmail = async (e) => {
    e.preventDefault();
    let data = { email: email, sendMail: true };
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let response = await res.json();
    if (res.status == 404) {
      toast.error(response.error, {
        position: "top-left",
        autoClose: 4500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (res.status == 403) {
      toast.error(response.error, {
        position: "top-left",
        autoClose: 4500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        router.push(`/${response.link}`);
      }, 5500);
    } else if (res.status == 200) {
      toast.success(response.msg, {
        position: "top-left",
        autoClose: 4500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        router.push(`/${response.link}`);
      }, 5500);
    } else {
      toast.error("Invalid request", {
        position: "top-left",
        autoClose: 4500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    let data = {
      newPassword: newPassword,
      confirmNewPassword: confirmNewPassword,
      token: router.query.token,
      sendMail: false,
    };
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let response = await res.json();
    if (res.status == 200) {
      toast.success(response.success, {
        position: "top-left",
        autoClose: 4500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        router.push("/login");
      }, 5500);
    } else if (res.status == 500) {
      toast.error(response.error, {
        position: "top-left",
        autoClose: 4500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        router.push("/");
      }, 5500);
    } else {
      toast.error(response.error, {
        position: "top-left",
        autoClose: 4500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div>
      <ToastContainer
        position="top-left"
        autoClose={4500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <section className="h-full gradient-form bg-white md:h-screen">
        <div className="container py-12 px-6 h-full">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="xl:w-1/3">
              <div className="block border-gray-200 border-2 shadow-lg rounded-lg">
                <div className=" px-4 md:px-0">
                  <div className="md:p-12 md:mx-6">
                    <div className="text-center">
                      <img
                        className="mx-auto w-48 mt-1 mb-12 pb-1"
                        src="/Codeswear-brand.png"
                        alt="logo"
                      />
                    </div>
                    {router.query.token && (
                      <form>
                        <div className="mb-4">
                          <input
                            type="password"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="newPassword"
                            placeholder="New Password"
                            name="newPassword"
                            value={newPassword}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="mb-4">
                          <input
                            type="password"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="confirmNewPassword"
                            placeholder="Confirm new password"
                            name="confirmNewPassword"
                            value={confirmNewPassword}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="text-center pt-1 mb-12 pb-1">
                          <button
                            onClick={resetPassword}
                            className="inline-block px-6 py-2.5 text-white bg-blue-600 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3 disabled:bg-blue-300"
                            type="button"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                            disabled={newPassword !== confirmNewPassword}
                          >
                            Continue
                          </button>
                        </div>
                        <div className="flex items-center justify-between pb-6">
                          <p className="mb-0 mr-2">
                            Login back to your account?
                          </p>
                          <Link href="/login">
                            <button
                              type="button"
                              className="inline-block px-6 py-2 border-2 border-green-600 text-green-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                              data-mdb-ripple="true"
                              data-mdb-ripple-color="light"
                            >
                              Login
                            </button>
                          </Link>
                        </div>
                      </form>
                    )}
                    {!router.query.token && (
                      <form>
                        <p className="mb-4">
                          Please provide your email address
                        </p>
                        <div className="mb-4">
                          <input
                            type="email"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="email"
                            placeholder="Email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="text-center pt-1 mb-12 pb-1">
                          <button
                            onClick={sendResetEmail}
                            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700  hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                            type="button"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                          >
                            Forgot Password
                          </button>
                        </div>
                        <div className="flex items-center justify-between pb-6">
                          <p className="mb-0 mr-2">
                            Login back to your account?
                          </p>
                          <Link href="/login">
                            <button
                              type="button"
                              className="inline-block px-6 py-2 border-2 border-green-600 text-green-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                              data-mdb-ripple="true"
                              data-mdb-ripple-color="light"
                            >
                              Login
                            </button>
                          </Link>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Forgot;
