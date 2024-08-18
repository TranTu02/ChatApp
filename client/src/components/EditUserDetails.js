import React, { useEffect, useRef, useState } from "react";
import Avatar from "./Avatar";
import uploadFile from "../helpers/uploadFile";
import Divider from "./Divider";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

const EditUserDetails = ({ onClose, user }) => {
  const [data, setData] = useState({
    name: user?.name || "",
    profile_pic: user?.profile_pic || "",
  });

  const uploadPhotoRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("User updated:", user);
    setData({
      name: user?.name || "",
      profile_pic: user?.profile_pic || "",
    });
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOpenUploadPhoto = (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadPhotoRef.current.click();
  };

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    const uploadPhoto = await uploadFile(file);

    setData((prevData) => ({
      ...prevData,
      profile_pic: uploadPhoto?.url,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Submitting data:", data);
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/update-user`;

      const response = await axios({
        method: "post",
        url: URL,
        data: data,
        withCredentials: true,
      });

      if (response.data.success) {
        dispatch(setUser(response.data.message));
      }

      toast.success(response?.data?.message);
      console.log("Response:", response);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to update user.");
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 items-center flex justify-center">
      <div className="bg-white p-4 m-1 rounded w-full max-w-sm">
        <h2 className="font-semibold">Profile Details</h2>
        <p className="text-sm my-3">Edit user details</p>

        <form className="grid gap-3 mt-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name </label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleOnChange}
              className="w-full py-1 focus:outline-primary border-0.5"
            />
          </div>
          <div>
            <div>Photo</div>
            <div className="my-1 flex items-center gap-4">
              <Avatar width={50} height={50} imageUrl={data?.profile_pic} name={data?.name} />
              <button type="button" className="font-semibold" onClick={handleOpenUploadPhoto}>
                Change photo
              </button>
              <input
                type="file"
                id="profile_pic"
                className="hidden"
                ref={uploadPhotoRef}
                onChange={handleUploadPhoto}
              />
            </div>
            <Divider />
            <div className="flex gap-2 w-fit ml-auto mt-3">
              <button
                type="button"
                onClick={onClose}
                className="border-primary border px-4 py-1 text-primary rounded hover:bg-primary hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="border-primary border px-4 py-1 text-white bg-primary rounded hover:bg-secondary"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(EditUserDetails);
