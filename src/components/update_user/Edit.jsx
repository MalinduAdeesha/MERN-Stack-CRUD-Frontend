import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    fname: "",
    lname: "",
    age: "",
    image: "",
    status: "",
  });

  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/getone/${id}`
        );
        setUser(response.data.userData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = user.image; // Use existing image by default
      if (newImage) {
        const formData = new FormData();
        formData.append("image", newImage);
        const response = await axios.post(
          "http://localhost:8000/upload",
          formData
        );
        imageUrl = response.data.image_url;
      }

      const updatedUserData = { ...user, image: imageUrl };
      await axios.put(
        `http://localhost:8000/api/update/${id}`,
        updatedUserData
      );

      toast.success("User updated successfully!", { position: "top-center" });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update user. Please try again later.", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="update-user w-[25%] bg-white shadow-md rounded-sm my-[50px] mx-auto p-12">
      <Link to={"/"}>
        <i className="text-xl fa-solid fa-arrow-left back"></i>
      </Link>
      <h3 className="mt-3 mb-8 text-3xl font-semibold text-center">
        Update User
      </h3>
      <form className="mt-5 add-user-form" onSubmit={submitForm}>
        <div className="flex flex-col justify-center w-full input-group">
          <label htmlFor="fname" className="mb-1">
            First Name
          </label>
          <input
            type="text"
            onChange={inputChangeHandler}
            value={user.fname}
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
            onChange={inputChangeHandler}
            value={user.lname}
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
            onChange={inputChangeHandler}
            value={user.age}
            name="age"
            id="age"
            autoComplete="off"
            placeholder="age"
            className="p-2 mb-2 text-sm outline-1 outline-dotted focus:outline-2 "
          />
        </div>

        <div className="flex flex-col justify-center input-group">
          <label htmlFor="image" className="mb-1">
            New Image
          </label>
          <div className="flex flex-row justify-between ">
            <input
              type="file"
              onChange={handleImageChange}
              name="image"
              id="image"
              autoComplete="off"
              className="p-2 mb-2 text-sm outline-1 outline-dotted focus:outline-2 w-[80%]"
            />
            <img src={user.image} value={user} alt="" className="w-10 h-10 " />
          </div>
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
                onChange={inputChangeHandler}
                autoComplete="off"
                checked={user.status === "active"}
                className="w-10 "
              />
            </label>
            <label htmlFor="inactive" className="ml-16">
              Inactive
              <input
                type="radio"
                id="inactive"
                name="status"
                value="inactive"
                onChange={inputChangeHandler}
                autoComplete="off"
                checked={user.status === "inactive"}
                className="w-10"
              />
            </label>
          </div>
        </div>

        <div className="flex flex-col justify-center w-full input-group">
          <button
            type="submit"
            className="w-full p-2 mt-5 mb-5 text-base font-bold text-center text-white transition-all bg-purple-600 border-none rounded-sm shadow-xl outline-none cursor-pointer hover:scale-105 "
          >
            UPDATE USER
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
