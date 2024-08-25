import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { PiUserCircle } from "react-icons/pi";
import Avatar from "../components/Avatar";
const CheckEmailPage = () => {
  const [data, setData] = useState({
    email: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/email`;

    try {
      const response = await axios.post(URL, data);

      toast.success(response.data.message);

      if (response.data.success) {
        setData({
          email: "",
        });
        navigate("/password", {
          state: response?.data,
        });
      }
    } catch (error) {
      toast.error(error?.response?.data.message);
    }
  };
  return (
    <div className="mt-5">
      <div className="mt-5 bg-white w-full max-w-md mx:2 mx-auto rounded overflow-hidden p-4 md:mx-auto">
        <div className="w-fit mx-auto mb-2">
          <Avatar width={70} height={70} />
        </div>
        <h3>Welcome to ChatApp</h3>
        <form className="grid gap-4 mt-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="enter your email..."
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              onChange={handleOnChange}
              value={data.email}
              required
            />
          </div>

          <button className="bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide">
            Let's go
          </button>

          <p className="mb-2 text-center">
            Don't have account ?
            <Link to={"/register"} className="hover:text-primary font-semibold">
              {" "}
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default CheckEmailPage;
