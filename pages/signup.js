import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      router.push("/");
    }
  }, []);

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handlerChange = (e) => {
    if (e.target.name == "name") setname(e.target.value);
    else if (e.target.name == "email") setemail(e.target.value);
    else if (e.target.name == "password") setpassword(e.target.value);
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const formBody = { name, email, password };
    let response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formBody),
    });
    let req = await response.json();
    if (response.status == 200) {
      toast.success(
        "Signup successfully completed. Redirecting you to login page!",
        {
          position: "top-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      setTimeout(() => {
        router.push("/login");
      }, 2500);
    } else if (response.status == 400 || response.status == 500) {
      toast.error(req.error, {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setname("");
    setemail("");
    setpassword("");
  };

  return (
    <div>
      <section className="h-full gradient-form bg-white md:h-screen">
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
                    <form onSubmit={handlerSubmit} method="POST">
                      <p className="mb-4">Create your new account</p>
                      <div className="mb-4">
                        <input
                          required="required"
                          onChange={handlerChange}
                          type="text"
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="name"
                          placeholder="Name"
                          name="name"
                          value={name}
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          required="required"
                          onChange={handlerChange}
                          type="email"
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="email"
                          placeholder="Email"
                          name="email"
                          value={email}
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          required="required"
                          onChange={handlerChange}
                          type="password"
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="password"
                          placeholder="Password"
                          name="password"
                          value={password}
                        />
                      </div>
                      <div className="text-center pt-1 mb-12 pb-1">
                        <button
                          className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                          type="button"
                          data-mdb-ripple="true"
                          data-mdb-ripple-color="light"
                          onClick={handlerSubmit}
                        >
                          Sign up
                        </button>
                      </div>
                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Already have an account?</p>
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

export default Signup;
