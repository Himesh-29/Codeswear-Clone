import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Forgot = () => {
  let router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      router.push("/");
    }
  }, []);
  return (
    <div>
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
                    <form>
                      <p className="mb-4">Please provide your email address</p>
                      <div className="mb-4">
                        <input
                          type="email"
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="email"
                          placeholder="Email"
                          name="email"
                        />
                      </div>

                      <div className="text-center pt-1 mb-12 pb-1">
                        <button
                          className="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                          type="button"
                          data-mdb-ripple="true"
                          data-mdb-ripple-color="light"
                          style={{
                            background:
                              "linear-gradient(to right,#ee7724,#d8363a,#dd3675,#b44593)",
                          }}
                        >
                          Forgot Password
                        </button>
                      </div>
                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Login back to your account?</p>
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

export default Forgot;
