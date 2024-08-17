import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PiUserCircle } from "react-icons/pi";
import Avatar from "../components/Avatar";
const CheckPasswordPage = () => {
  const [data, setData] = useState({
    email: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

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

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/password`;

    try {
      const response = await axios({
        method: "post",
        url: URL,
        data: {
          userId: location?.state?.data._id,
          password: data.password,
        },
        withCredentials: true,
      });

      toast.success(response.data.message);

      if (response.data.success) {
        setData({
          password: "",
        });
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data.message);
    }
  };
  return (
    <div className="mt-5">
      <div className="mt-5 bg-white w-full max-w-md mx:2 mx-auto rounded overflow-hidden p-4 md:mx-auto">
        <div className="flex flex-col items-center w-fit mx-auto mb-2 ">
          <Avatar
            width={70}
            height={70}
            name={location?.state?.data.name}
            imageUrl={location?.state?.data.profile_pic}
          />
          <h2 className="font-semibold text-lg">{location?.state?.data.name}</h2>
        </div>
        <form className="grid gap-4 mt-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="enter your password..."
              className="bg-slate-100 px-2 py-1 focus:outline-primary"
              onChange={handleOnChange}
              value={data.password}
              required
            />
          </div>

          <button className="bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide">
            Let's go
          </button>

          <p className="mb-2 text-center">
            Already have account ?
            <Link to={"/password"} className="hover:text-primary font-semibold">
              {" "}
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default CheckPasswordPage;
