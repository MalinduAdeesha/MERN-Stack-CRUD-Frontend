import React, { useState } from "react";
import axios from "axios"; // Import Axios for making HTTP requests
import { Link } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accept, setAccept] = useState(false);

  const handleChecked = (event) => {
    setAccept(event.target.checked);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (!accept) {
      alert("Please accept the terms of use and privacy policy.");
      return;
    }

    let body = {
      name: name,
      email: email,
      password: password,
    };

    try {
      await axios
        .post("http://localhost:8000/admin/create", body)
        .then((r) => {
          alert("Sign up successful!");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      alert("Error signing up. Please try again later.");
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="signup bg-blue-50">
      <div className="signup-container w-[25%] mt-[75px]  bg-white m-auto px-14 py-16 rounded-md shadow-xl">
        <h1 className="text-3xl font-semibold text-center ">Sign Up</h1>
        <form
          className="flex flex-col login-signup-fields gap-7 mt-7"
          onSubmit={handleSignUp}
        >
          <input
            className="h-[40px] w-[100%] pl-5 border-2 border-[#c9c9c9] outline-none text-[#5c5c5c] text-sm rounded-lg focus:border-purple-500"
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="h-[40px] w-[100%] pl-5 border-2 border-[#c9c9c9] outline-none text-[#5c5c5c] text-sm rounded-lg focus:border-purple-500"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="h-[40px] w-[100%] pl-5 border-2 border-[#c9c9c9] outline-none text-[#5c5c5c] text-sm rounded-lg focus:border-purple-500"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            disabled={!accept}
            className="w-[100%] h-[50px] text-white bg-red-500 mt-7 border-none text-lg font-medium cursor-pointer rounded-xl disabled:bg-red-300 disabled:cursor-not-allowed active:bg-red-800"
            type="submit"
            onClick={() => {
              console.log(name, password, email);
            }}
          >
            Continue
          </button>
        </form>
        <p className="mt-5 loginSignup-login text-[#5c5c5c] text-sm font-light">
          Already have an account ?{" "}
          <span className="text-[red] font-semibold cursor-pointer hover:underline">
            <Link to={"/"}>Login here</Link>{" "}
          </span>
        </p>
        <div className="flex items-center gap-5 mt-6 loginSignup-agree text-[#5c5c5c]  font-medium">
          <input
            type="checkbox"
            name=""
            id=""
            className="cursor-pointer "
            onClick={handleChecked}
          />
          <p className=" loginSignup-login text-[#5c5c5c] text-sm font-medium">
            By continuing, I agree to the terms of use & privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
