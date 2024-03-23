import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const User = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/getall");
        setUsers(response.data.userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const response = await axios
        .delete(`http://localhost:8000/api/delete/${userId}`)
        .then((response) => {
          toast.success(response.data.message, { position: "top-center" });
          navigate("/");
        });
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));

      console.log(response);

      const refreshedResponse = await axios.get(
        "http://localhost:8000/api/getall"
      );
      setUsers(refreshedResponse.data.userData);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <div className="user-table w-[80%] bg-white shadow-lg rounded-md my-[50px] mx-auto p-[50px]">
        <Link
          to={"/add"}
          className="p-2 font-medium text-white bg-green-500 rounded-sm shadow-md add-button"
        >
          Add user
        </Link>
        <table
          border={1}
          cellPadding={10}
          cellSpacing={0}
          className="w-full mt-8 border-collapse"
        >
          <thead>
            <tr>
              <th className="p-2 text-white bg-gray-500 outline outline-1 outline-slate-200">
                Id
              </th>
              <th className="p-2 text-white bg-gray-500 outline outline-1 outline-slate-200">
                Image
              </th>
              <th className="p-2 text-white bg-gray-500 outline outline-1 outline-slate-200">
                Name
              </th>
              <th className="p-2 text-white bg-gray-500 outline outline-1 outline-slate-200">
                Age
              </th>
              <th className="p-2 text-white bg-gray-500 outline outline-1 outline-slate-200">
                Status
              </th>
              <th className="p-2 text-white bg-gray-500 outline outline-1 outline-slate-200">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) && users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user._id}>
                  <td className="p-2 text-center outline outline-1 outline-slate-200">
                    {index + 1}
                  </td>
                  <td className="flex items-center justify-center p-2 text-center outline outline-1 outline-slate-200">
                    <img src={user.image} alt="" className="w-10 h-10 " />

                  </td>
                  <td className="p-2 text-center outline outline-1 outline-slate-200">
                    {user.fname} {user.lname}
                  </td>
                  <td className="p-2 text-center outline outline-1 outline-slate-200">
                    {user.age}
                  </td>

                  <td className={`p-2 text-center outline outline-1 outline-slate-200 ${user.status === "active" ? "text-green-500" : "text-red-500"}`}>
                    {user.status}
                  </td>
                  <td className="p-2 text-center action-buttons outline outline-1 outline-slate-200">
                    <Link
                      to={`/edit/${user._id}`}
                      className="outline-none bg-purple-500 py-[10px] px-[10px] text-white cursor-pointer rounded-md mr-3"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="outline-none bg-red-500 py-2 px-[10px] text-white cursor-pointer rounded-md"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
