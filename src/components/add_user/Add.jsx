import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Add = () => {
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    age: "",
    image: null,
    status: "",
  });

  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", image);
      const response = await axios.post(
        "http://localhost:8000/upload",
        formData
      );
      const imageNewUrl = response.data.image_url;

      await axios.post("http://localhost:8000/api/create", {
        ...user,
        image: imageNewUrl,
      });

      toast.success("User added successfully!", { position: "top-center" });
      navigate("/");
    } catch (error) {
      console.error("Error uploading image or creating user:", error);
      toast.error("Failed to add user. Please try again later.", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="add-user w-[25%] bg-white shadow-md rounded-sm my-[50px] mx-auto p-12">
      <Link to={"/"}>
        <i className="text-xl fa-solid fa-arrow-left back"></i>
      </Link>
      <h3 className="mt-3 mb-8 text-3xl font-semibold text-center">
        Add New User
      </h3>
      <form className="mt-5 add-user-form" onSubmit={submitForm}>
        
        <div className="flex flex-col justify-center w-full input-group">
          <label htmlFor="fname" className="mb-1">
            First Name
          </label>
          <input
            type="text"
            onChange={inputHandler}
            name="fname"
            id="fname"
            autoComplete="off"
            placeholder="first name"
            className="p-2 mb-2 text-sm outline-1 outline-dotted focus:outline-2 "
          />
        </div>

        <div className="flex flex-col justify-center w-full input-group">
          <label htmlFor="lname" className="mb-1">
            Last Name
          </label>
          <input
            type="text"
            onChange={inputHandler}
            name="lname"
            id="lname"
            autoComplete="off"
            placeholder="last name"
            className="p-2 mb-2 text-sm outline-1 outline-dotted focus:outline-2 "
          />
        </div>

        <div className="flex flex-col justify-center w-full input-group">
          <label htmlFor="age" className="mb-1">
            Age
          </label>
          <input
            type="age"
            onChange={inputHandler}
            name="age"
            id="age"
            autoComplete="off"
            placeholder="age"
            className="p-2 mb-2 text-sm outline-1 outline-dotted focus:outline-2 "
          />
        </div>

        
        <div className="flex flex-col justify-center w-full input-group">
          <label htmlFor="image" className="mb-1">
            Image
          </label>
          <input
            type="file"
            onChange={handleImageChange}
            name="image"
            id="image"
            autoComplete="off"
            className="p-2 mb-2 text-sm outline-1 outline-dotted focus:outline-2 "
          />
        </div>

        <div className="flex flex-col justify-center w-full input-group">
          <label htmlFor="status" className="mb-1">
            Status
          </label>
          <div>
            <label htmlFor="active" className="ml-5">
              Active
              <input
                type="radio"
                id="active"
                name="status"
                value="active"
                onChange={inputHandler}
                autoComplete="off"
                className="w-10"
              />
            </label>
            <label htmlFor="inactive" className="ml-16">
              Inactive
              <input
                type="radio"
                id="inactive"
                name="status"
                value="inactive"
                onChange={inputHandler}
                autoComplete="off"
                className="w-10"
              />
            </label>
          </div>
        </div>

        
        <div className="flex flex-col justify-center w-full input-group">
          <button
            type="submit"
            className="w-full p-2 mt-5 mb-5 text-base font-bold text-center text-white transition-all bg-green-500 border-none rounded-sm shadow-xl outline-none cursor-pointer hover:scale-105 "
          >
            ADD USER
          </button>
        </div>
      </form>
      <Toaster position="top-center" />
    </div>
  );
};

export default Add;
