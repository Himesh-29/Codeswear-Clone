import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { ToastContainer, toast } from "react-toastify";

const account = ({ user, logout }) => {
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      router.push("/");
    }
  }, [router.query]);

  const [currentPassword, setcurrentPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmNewPassword, setconfirmNewPassword] = useState("");

  const handlerChange = (e) => {
    if (e.target.name == "currentPassword") setcurrentPassword(e.target.value);
    else if (e.target.name == "newPassword") setnewPassword(e.target.value);
    else if (e.target.name == "confirmNewPassword")
      setconfirmNewPassword(e.target.value);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (newPassword.length <= 5) {
      toast.error("Please provide a long password", {
        position: "top-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (currentPassword == newPassword) {
      toast.error(
        "The new and old passwords match with each other. Please try again.",
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
    } else {
      let res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/updatePassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: user.value,
            currentPassword: currentPassword,
            newPassword: newPassword,
          }),
        }
      );
      let response = await res.json();
      if (res.status == 200) {
        toast.success(response.success + ". Redirecting you to login page", {
          position: "top-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          logout();
          router.push("/login");
        }, 2500);
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
    }
  };

  return (
    <div className="container mx-auto">
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
      <h1 className="text-3xl text-center font-bold my-10">
        Update your account
      </h1>

      <h2 className="lg:mx-32 mx-4 font-bold text-xl">Change Password</h2>
      <form onSubmit={submitForm}>
        <div className="mb-8 mt-4 lg:mx-32 mx-4">
          <div className="my-6" style={{ width: "100%" }}>
            <label
              htmlFor="currentPassword"
              className="leading-7 text-sm text-gray-600 font-semibold"
            >
              Current Password
            </label>
            <input
              required={true}
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={currentPassword}
              onChange={handlerChange}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="my-6" style={{ width: "100%" }}>
            <label
              htmlFor="newPassword"
              className="leading-7 text-sm text-gray-600 font-semibold"
            >
              New Password
            </label>
            <input
              required={true}
              type="password"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={handlerChange}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="my-6" style={{ width: "100%" }}>
            <label
              htmlFor="confirmNewPassword"
              className="leading-7 text-sm text-gray-600 font-semibold"
            >
              Confirm Password
            </label>

            <input
              required={true}
              type="password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              value={confirmNewPassword}
              onChange={handlerChange}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="mt-5 ">
            <button
              className="flex mr-2 text-white bg-blue-600 border-0 p-2 focus:outline-none hover:bg-blue-700 rounded text-sm font-semibold disabled:bg-blue-300"
              onSubmit={submitForm}
              disabled={newPassword !== confirmNewPassword}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default account;
