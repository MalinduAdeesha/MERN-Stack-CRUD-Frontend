import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();

    let body = {
      email: email,
      password: password,
    };
    await axios
      .post("http://localhost:8000/admin/login", body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((r) => {
        console.log(r);
        if (r.status == 200) {
          //navigate to student view
          navigate("/home");
        } else {
          //back to login page
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);

        navigate("/");
        alert("try again");
      });
  };

  return (
    <div className="signin bg-blue-50">
      <div className="signin-container w-[25%] mt-[75px] h-[500px]  bg-white m-auto px-14 py-16 rounded-md shadow-xl">
        <h1 className="text-3xl font-semibold text-center ">Login</h1>
        <div className="flex flex-col login-signup-fields gap-7 mt-7">
          <input
            className="h-[40px] w-[100%] pl-5 border-2 border-[#c9c9c9] outline-none text-[#5c5c5c] text-sm rounded-lg focus:border-purple-500"
            type="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            className="h-[40px] w-[100%] pl-5 border-2 border-[#c9c9c9] outline-none text-[#5c5c5c] text-sm rounded-lg focus:border-purple-500"
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button
          onClick={handleSignIn}
          className="w-[100%] h-[50px] text-white bg-red-500 mt-7 border-none text-lg font-medium   rounded-xl disabled:bg-red-300 disabled:cursor-not-allowed active:bg-red-800 cursor-pointer shadow-xl"
        >
          Continue
        </button>
        <p className="mt-5 loginSignup-login text-[#5c5c5c] text-sm font-light">
          Dont have an account ?
          <span className="text-[red] font-semibold cursor-pointer hover:underline ">
            {" "}
            <Link to={"/signup"}>Register</Link>{" "}
          </span>
          <p className="my-2 font-normal text-center">or</p>
        </p>
        <button className="w-[100%] h-[50px] text-black bg-slate-100  border-1 border text-base font-light   rounded-xl  cursor-pointer shadow-xl flex items-center justify-evenly">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0 0 48 48"
            className="w-10 h-10"
          >
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            ></path>
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            ></path>
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
          </svg>
          <p>Sign in with Google</p>
        </button>
      </div>
    </div>
  );
};

export default SignIn;
