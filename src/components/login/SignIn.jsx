import React from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="signin bg-blue-50">
      <div className="signin-container w-[25%] mt-[75px] h-[500px]  bg-white m-auto px-14 py-16 rounded-md shadow-xl">
        <h1 className="text-3xl font-semibold text-center ">Login</h1>
        <div className="flex flex-col login-signup-fields gap-7 mt-7">
          <input
            className="h-[40px] w-[100%] pl-5 border-2 border-[#c9c9c9] outline-none text-[#5c5c5c] text-sm rounded-lg focus:border-purple-500"
            type="email"
            placeholder="Email"
          />
          <input
            className="h-[40px] w-[100%] pl-5 border-2 border-[#c9c9c9] outline-none text-[#5c5c5c] text-sm rounded-lg focus:border-purple-500"
            type="password"
            placeholder="Password"
          />
        </div>
        <button className="w-[100%] h-[50px] text-white bg-red-500 mt-7 border-none text-lg font-medium   rounded-xl disabled:bg-red-300 disabled:cursor-not-allowed active:bg-red-800 cursor-pointer">
          Continue
        </button>
        <p className="mt-5 loginSignup-login text-[#5c5c5c] text-sm font-light">
          Dont have an account ?
          <span className="text-[red] font-semibold cursor-pointer hover:underline ">
            {" "}
            <Link to={"/"}>Register</Link>{" "}
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
